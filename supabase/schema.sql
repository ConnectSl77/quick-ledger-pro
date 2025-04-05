
-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Vendors table
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers table
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
  status VARCHAR(20) NOT NULL CHECK (status IN ('processing', 'shipped', 'delivered')),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert message function
CREATE OR REPLACE FUNCTION insert_message(
  p_sender_id UUID,
  p_receiver_id UUID,
  p_content TEXT
) RETURNS void AS $$
BEGIN
  INSERT INTO messages (sender_id, receiver_id, content)
  VALUES (p_sender_id, p_receiver_id, p_content);
END;
$$ LANGUAGE plpgsql;

-- Get conversations function
CREATE OR REPLACE FUNCTION get_conversations(user_id UUID)
RETURNS TABLE (
  conversation_id UUID,
  user_name TEXT,
  last_message TEXT,
  last_message_time TIMESTAMP WITH TIME ZONE
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH conversations AS (
    SELECT DISTINCT
      CASE
        WHEN sender_id = user_id THEN receiver_id
        ELSE sender_id
      END AS conversation_id
    FROM messages
    WHERE sender_id = user_id OR receiver_id = user_id
  )
  SELECT
    c.conversation_id,
    COALESCE(
      (SELECT name FROM suppliers WHERE id = c.conversation_id),
      (SELECT name FROM vendors WHERE id = c.conversation_id),
      'Unknown User'
    ) AS user_name,
    (
      SELECT content
      FROM messages m
      WHERE (m.sender_id = user_id AND m.receiver_id = c.conversation_id)
        OR (m.sender_id = c.conversation_id AND m.receiver_id = user_id)
      ORDER BY created_at DESC
      LIMIT 1
    ) AS last_message,
    (
      SELECT created_at
      FROM messages m
      WHERE (m.sender_id = user_id AND m.receiver_id = c.conversation_id)
        OR (m.sender_id = c.conversation_id AND m.receiver_id = user_id)
      ORDER BY created_at DESC
      LIMIT 1
    ) AS last_message_time
  FROM conversations c;
END;
$$;

-- Indexes for better query performance
CREATE INDEX idx_products_vendor_id ON products(vendor_id);
CREATE INDEX idx_products_supplier_id ON products(supplier_id);
CREATE INDEX idx_orders_vendor_id ON orders(vendor_id);
CREATE INDEX idx_orders_supplier_id ON orders(supplier_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);

-- Trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all tables
CREATE TRIGGER update_vendors_updated_at
    BEFORE UPDATE ON vendors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at
    BEFORE UPDATE ON suppliers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, User } from "lucide-react";
import { getCurrentSupplierId } from '@/integrations/supabase/queries';
import { useToast } from '@/hooks/use-toast';

interface MessagePanelProps {
  userType: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
}

interface Message {
  id: string;
  sender_id: string;
  content: string;
  timestamp: string;
}

const MessagePanel = ({ userType }: MessagePanelProps) => {
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  
  // In a real app, we would fetch these from the API
  const conversations: Conversation[] = [
    {
      id: '1',
      name: userType === 'supplier' ? 'Freetown Grocery Mart' : 'Sierra Leone Distributors',
      lastMessage: 'We need to discuss the latest order',
      time: '10:30 AM'
    },
    {
      id: '2',
      name: userType === 'supplier' ? 'Central Market Store' : 'Makeni Supplies Ltd',
      lastMessage: 'When can we expect delivery?',
      time: '9:45 AM'
    },
    {
      id: '3',
      name: userType === 'supplier' ? 'Bo City Supermarket' : 'Kenema Products Co',
      lastMessage: 'Price inquiry for bulk orders',
      time: 'Yesterday'
    }
  ];
  
  // Sample messages for demo
  const messages: Record<string, Message[]> = {
    '1': [
      { id: '101', sender_id: 'supplier-1', content: 'Hello, I wanted to check on our latest order status', timestamp: '10:15 AM' },
      { id: '102', sender_id: 'vendor-1', content: 'Hi there! The order is being processed and will ship by tomorrow', timestamp: '10:20 AM' },
      { id: '103', sender_id: 'supplier-1', content: 'Great, thank you for the update!', timestamp: '10:30 AM' },
    ],
    '2': [
      { id: '201', sender_id: 'supplier-1', content: 'When can we expect the next delivery?', timestamp: '9:30 AM' },
      { id: '202', sender_id: 'vendor-2', content: 'We are scheduling deliveries for next Tuesday', timestamp: '9:45 AM' },
    ],
    '3': [
      { id: '301', sender_id: 'vendor-3', content: 'I wanted to inquire about bulk pricing for rice and flour', timestamp: 'Yesterday' },
      { id: '302', sender_id: 'supplier-1', content: 'For orders over 20 bags, we offer a 15% discount', timestamp: 'Yesterday' },
    ]
  };
  
  const isCurrentUser = (senderId: string): boolean => {
    // In real app, compare with actual user ID
    return userType === 'supplier' ? senderId.startsWith('supplier') : senderId.startsWith('vendor');
  };

  const handleSend = () => {
    if (!message.trim() || !activeConversation) return;
    
    // In a real app, we would send this to the API
    toast({
      title: "Message Sent",
      description: "Your message has been delivered.",
    });
    
    setMessage("");
  };

  return (
    <Card className="w-full">
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-medium">Messages</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {!activeConversation ? (
          <div className="max-h-60 overflow-y-auto">
            {conversations.map((convo) => (
              <div 
                key={convo.id} 
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 border-t first:border-t-0"
                onClick={() => setActiveConversation(convo.id)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User size={16} />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2 flex-1 overflow-hidden">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium truncate">{convo.name}</span>
                    <span className="text-xs text-gray-500">{convo.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{convo.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col h-60">
            <div className="flex items-center p-3 border-b">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 mr-2"
                onClick={() => setActiveConversation(null)}
              >
                &larr;
              </Button>
              <span className="text-sm font-medium">
                {conversations.find(c => c.id === activeConversation)?.name}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages[activeConversation]?.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${isCurrentUser(msg.sender_id) ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-2 rounded-lg ${
                      isCurrentUser(msg.sender_id) 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-70 block text-right">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t flex">
              <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 mr-2"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button size="icon" onClick={handleSend}>
                <Send size={16} />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessagePanel;

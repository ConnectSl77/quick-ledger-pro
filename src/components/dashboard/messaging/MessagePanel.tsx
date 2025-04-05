import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, User } from "lucide-react";
import { getCurrentSupplierId, getConversations, getMessages, createMessage } from '@/integrations/supabase/queries';
import { useToast } from '@/hooks/use-toast';

interface MessagePanelProps {
  userType: string;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

const MessagePanel = ({ userType }: MessagePanelProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const id = await getCurrentSupplierId();
        setCurrentUserId(id);
      } catch (error) {
        console.error("Error fetching current user ID:", error);
      }
    };
    
    fetchCurrentUserId();
  }, []);
  
  // Fetch conversations
  const { data: conversations = [], isLoading: isLoadingConversations } = useQuery({
    queryKey: ['conversations', currentUserId],
    queryFn: () => getConversations(currentUserId),
    enabled: !!currentUserId,
  });
  
  // Fetch messages for the active conversation
  const { data: messages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', currentUserId, activeConversation],
    queryFn: () => getMessages(currentUserId, activeConversation || ""),
    enabled: !!currentUserId && !!activeConversation,
  });
  
  // Create message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({ senderId, receiverId, content }: { senderId: string; receiverId: string; content: string }) =>
      createMessage(senderId, receiverId, content),
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['messages', currentUserId, activeConversation] });
      queryClient.invalidateQueries({ queryKey: ['conversations', currentUserId] });
      
      toast({
        title: "Message Sent",
        description: "Your message has been delivered.",
      });
      
      setMessage("");
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      toast({
        title: "Message Failed",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const isCurrentUser = (senderId: string): boolean => {
    return senderId === currentUserId;
  };

  const handleSend = () => {
    if (!message.trim() || !activeConversation || !currentUserId) return;
    
    sendMessageMutation.mutate({
      senderId: currentUserId,
      receiverId: activeConversation,
      content: message
    });
  };
  
  // Use dummy data if no real data is available yet
  const displayConversations = conversations.length > 0 ? conversations : [
    {
      conversation_id: '1',
      user_name: userType === 'supplier' ? 'Freetown Grocery Mart' : 'Sierra Leone Distributors',
      last_message: 'We need to discuss the latest order',
      last_message_time: new Date().toISOString()
    },
    {
      conversation_id: '2',
      user_name: userType === 'supplier' ? 'Central Market Store' : 'Makeni Supplies Ltd',
      last_message: 'When can we expect delivery?',
      last_message_time: new Date(Date.now() - 3600000).toISOString()
    }
  ];
  
  // Format timestamp to readable format
  const formatTime = (timestamp: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="w-full">
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-medium">Messages</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {!activeConversation ? (
          <div className="max-h-60 overflow-y-auto">
            {isLoadingConversations ? (
              <div className="flex justify-center p-4">Loading conversations...</div>
            ) : displayConversations.length === 0 ? (
              <div className="flex justify-center p-4">No conversations yet</div>
            ) : (
              displayConversations.map((convo) => (
                <div 
                  key={convo.conversation_id} 
                  className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 border-t first:border-t-0"
                  onClick={() => setActiveConversation(convo.conversation_id)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-2 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium truncate">{convo.user_name}</span>
                      <span className="text-xs text-gray-500">{formatTime(convo.last_message_time)}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{convo.last_message}</p>
                  </div>
                </div>
              ))
            )}
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
                {displayConversations.find(c => c.conversation_id === activeConversation)?.user_name || "Chat"}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {isLoadingMessages ? (
                <div className="flex justify-center p-4">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="flex justify-center p-4 text-gray-500 text-sm">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((msg) => (
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
                      <span className="text-xs opacity-70 block text-right">
                        {formatTime(msg.created_at)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-3 border-t flex">
              <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 mr-2"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={sendMessageMutation.isPending}
              />
              <Button 
                size="icon" 
                onClick={handleSend}
                disabled={sendMessageMutation.isPending || !message.trim()}
              >
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

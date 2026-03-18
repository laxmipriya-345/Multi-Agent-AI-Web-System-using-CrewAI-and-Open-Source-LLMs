import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import AgentStatus from './components/AgentStatus';
import ResponseViewer from './components/ResponseViewer';
import { sendMessage } from './services/api';
import { MessageSquare, Bot, BarChart } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([]);
  const [agentStatus, setAgentStatus] = useState({
    analyzer: 'idle',
    generator: 'idle',
    evaluator: 'idle'
  });
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const handleSendMessage = async (message) => {
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    // Simulate agent workflow
    setAgentStatus({ analyzer: 'working', generator: 'idle', evaluator: 'idle' });

    try {
      // Analyzer phase
      setTimeout(() => {
        setAgentStatus({ analyzer: 'complete', generator: 'working', evaluator: 'idle' });
      }, 1000);

      // Generator phase
      setTimeout(() => {
        setAgentStatus({ analyzer: 'complete', generator: 'complete', evaluator: 'working' });
      }, 2000);

      // Send to backend
      const response = await sendMessage(message, sessionId);
      
      // Evaluator phase complete
      setAgentStatus({ analyzer: 'complete', generator: 'complete', evaluator: 'complete' });

      // Add agent response
      const agentMessage = {
        id: Date.now() + 1,
        text: response.response,
        sender: 'agent',
        timestamp: new Date().toISOString(),
        analysis: response.analysis
      };

      setMessages(prev => [...prev, agentMessage]);
      setSessionId(response.session_id);

    } catch (error) {
      console.error('Error:', error);
      setAgentStatus({ analyzer: 'error', generator: 'error', evaluator: 'error' });
      
      // Add error message
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'agent',
        timestamp: new Date().toISOString(),
        error: true
      }]);
    } finally {
      setLoading(false);
      
      // Reset agent status after delay
      setTimeout(() => {
        setAgentStatus({ analyzer: 'idle', generator: 'idle', evaluator: 'idle' });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Multi-Agent AI System
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">3 Active Agents</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Agent Status Sidebar */}
          <div className="lg:col-span-1">
            <AgentStatus status={agentStatus} />
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
              <ChatInterface 
                messages={messages} 
                onSendMessage={handleSendMessage}
                loading={loading}
              />
            </div>
          </div>
        </div>

        {/* Response Viewer (for detailed analysis) */}
        {messages.length > 0 && messages[messages.length - 1].sender === 'agent' && (
          <div className="mt-6">
            <ResponseViewer message={messages[messages.length - 1]} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
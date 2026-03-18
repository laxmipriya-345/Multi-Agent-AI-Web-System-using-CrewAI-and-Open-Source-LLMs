import React from 'react';
import { Brain, Lightbulb, CheckCircle, Loader2, AlertCircle, Clock } from 'lucide-react';

const AgentStatus = ({ status }) => {
  const agents = [
    {
      id: 'analyzer',
      name: 'Analyzer Agent',
      icon: Brain,
      color: 'blue',
      description: 'Breaks down queries into components'
    },
    {
      id: 'generator',
      name: 'Generator Agent',
      icon: Lightbulb,
      color: 'green',
      description: 'Creates comprehensive solutions'
    },
    {
      id: 'evaluator',
      name: 'Evaluator Agent',
      icon: CheckCircle,
      color: 'purple',
      description: 'Ensures quality and accuracy'
    }
  ];

  const getStatusIcon = (agentStatus) => {
    switch (agentStatus) {
      case 'working':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'complete':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (agentStatus) => {
    switch (agentStatus) {
      case 'working':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'complete':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Brain className="h-5 w-5 mr-2 text-purple-600" />
        Agent Status
      </h2>
      
      <div className="space-y-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const currentStatus = status[agent.id];
          
          return (
            <div
              key={agent.id}
              className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(currentStatus)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-5 w-5 text-${agent.color}-600`} />
                  <span className="font-medium">{agent.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(currentStatus)}
                  <span className="text-sm capitalize">
                    {currentStatus}
                  </span>
                </div>
              </div>
              <p className="text-sm opacity-75">{agent.description}</p>
              
              {/* Progress bar for working state */}
              {currentStatus === 'working' && (
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-current animate-pulse rounded-full w-2/3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t">
        <h3 className="text-sm font-medium mb-2">Agent Workflow</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Idle</span>
          </div>
          <div className="flex items-center space-x-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Working</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-3 w-3" />
            <span>Complete</span>
          </div>
          <div className="flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>Error</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentStatus;
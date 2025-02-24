import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ShoppingCart, Link as LinkIcon, Users, Heart, Eye, MessageSquare, CheckCircle2 } from 'lucide-react';
import { AnimatedCTAButton } from '../components/AnimatedCTAButton';

interface TutorialStep {
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
}

const tutorials: Tutorial[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with Growth',
    description: 'Learn the basics of using Growth to boost your social media presence',
    steps: [
      {
        title: 'Choose Your Platform',
        description: 'Select from our supported platforms: YouTube, Facebook, or TikTok. Each platform has specific services tailored to your needs.',
        icon: Play,
        color: 'text-red-500'
      },
      {
        title: 'Select Your Service',
        description: 'Browse through our various services including followers, likes, views, and more. Each service comes with detailed information about delivery speed and quality.',
        icon: Heart,
        color: 'text-pink-500'
      },
      {
        title: 'Enter Your Link',
        description: 'Provide the link to your content or profile. Make sure it\'s public and accessible.',
        icon: LinkIcon,
        color: 'text-blue-500'
      },
      {
        title: 'Choose Quantity',
        description: 'Select how many followers, likes, or views you want. We offer flexible quantities to match your needs.',
        icon: Users,
        color: 'text-green-500'
      },
      {
        title: 'Review and Order',
        description: 'Double-check your order details and proceed to checkout. Our secure payment system ensures your transaction is safe.',
        icon: ShoppingCart,
        color: 'text-purple-500'
      }
    ]
  },
  {
    id: 'best-practices',
    title: 'Best Practices for Growth',
    description: 'Maximize your social media growth with these proven strategies',
    steps: [
      {
        title: 'Regular Engagement',
        description: 'Maintain consistent engagement by ordering services regularly rather than all at once.',
        icon: Eye,
        color: 'text-cyan-500'
      },
      {
        title: 'Quality Content',
        description: 'Combine our services with high-quality content to maintain authentic growth.',
        icon: CheckCircle2,
        color: 'text-emerald-500'
      },
      {
        title: 'Community Building',
        description: 'Engage with your audience through comments and responses to build a loyal community.',
        icon: MessageSquare,
        color: 'text-yellow-500'
      }
    ]
  }
];

export function Tutorials() {
  const [selectedTutorial, setSelectedTutorial] = useState<string>('getting-started');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const currentTutorial = tutorials.find(t => t.id === selectedTutorial);
  const steps = currentTutorial?.steps || [];

  const CurrentIcon = steps[currentStep]?.icon;

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Animated CTA Button */}
        <div className="mb-16">
          <AnimatedCTAButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">How to Use Growth</h1>
          <p className="text-gray-400 text-lg">
            Follow our step-by-step guides to maximize your social media presence
          </p>
        </motion.div>

        {/* Tutorial Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tutorials.map((tutorial) => (
            <motion.button
              key={tutorial.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedTutorial(tutorial.id);
                setCurrentStep(0);
              }}
              className={`p-6 rounded-xl text-left transition-colors ${
                selectedTutorial === tutorial.id
                  ? 'bg-gray-800 border-2 border-purple-500'
                  : 'bg-gray-800/50 hover:bg-gray-800'
              }`}
            >
              <h3 className="text-xl font-semibold text-white mb-2">{tutorial.title}</h3>
              <p className="text-gray-400">{tutorial.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Step-by-Step Guide */}
        <div className="bg-gray-800 rounded-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <motion.div
                className="h-full bg-purple-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-start gap-6"
              >
                <div className={`p-4 rounded-lg bg-gray-700/50 ${steps[currentStep]?.color}`}>
                  {CurrentIcon && <CurrentIcon className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {steps[currentStep]?.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {steps[currentStep]?.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="px-6 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={currentStep === steps.length - 1}
              className="px-6 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
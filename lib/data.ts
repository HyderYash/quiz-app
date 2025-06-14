import { Category, Quiz } from './types';

// Quick start quiz - the initial 2 questions
export const quickStartQuiz: Quiz = {
  id: 'quick-start',
  title: 'Quick Start!',
  description: 'Answer 2 questions and win up to 200 coins.',
  coinCost: 0,
  coinReward: 200,
  questions: [
    {
      id: 'qs-1',
      text: 'Who directed the film \'The Shape of Water\'?',
      options: ['Guillermo del Toro', 'Alejandro González Iñárritu', 'Alfonso Cuarón', 'Pedro Almodóvar'],
      correctAnswer: 0,
    },
    {
      id: 'qs-2',
      text: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
      correctAnswer: 2,
    },
  ],
};

// Main quiz categories and subcategories
export const categories: Category[] = [
  {
    id: 'nature',
    name: 'Nature And Environment',
    icon: 'earth',
    subcategories: [
      {
        id: 'ecology',
        name: 'Ecology',
        quizzes: [
          {
            id: 'nature-ecology',
            title: 'Play and Win 1000',
            description: 'Test your knowledge about nature and ecology.',
            coinCost: 100,
            coinReward: 1000,
            questions: [
              {
                id: 'n-1',
                text: 'Which gas is most abundant in Earth\'s atmosphere?',
                options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
                correctAnswer: 1,
              },
              {
                id: 'n-2',
                text: 'What is the process by which plants make their food?',
                options: ['Respiration', 'Photosynthesis', 'Transpiration', 'Germination'],
                correctAnswer: 1,
              },
              {
                id: 'n-3',
                text: 'Which of these is a renewable energy source?',
                options: ['Coal', 'Natural Gas', 'Solar Power', 'Nuclear Power'],
                correctAnswer: 2,
              },
            ],
          }
        ],
      }
    ],
  },
  {
    id: 'business',
    name: 'Business And Economics',
    icon: 'bar-chart-3',
    subcategories: [
      {
        id: 'companies',
        name: 'Companies',
        quizzes: [
          {
            id: 'business-companies',
            title: 'Play and Win 1000',
            description: 'Test your knowledge about business and companies.',
            coinCost: 100,
            coinReward: 1000,
            questions: [
              {
                id: 'b-1',
                text: 'Who is the founder of Microsoft?',
                options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Larry Page'],
                correctAnswer: 1,
              },
              {
                id: 'b-2',
                text: 'What does CEO stand for?',
                options: ['Chief Executive Officer', 'Chief Economic Officer', 'Central Executive Officer', 'Corporate Executive Officer'],
                correctAnswer: 0,
              },
              {
                id: 'b-3',
                text: 'Which company owns Instagram?',
                options: ['Google', 'Microsoft', 'Meta', 'Twitter'],
                correctAnswer: 2,
              },
            ],
          }
        ],
      }
    ],
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'zap',
    subcategories: [
      {
        id: 'ipl',
        name: 'IPL',
        quizzes: [
          {
            id: 'sports-ipl',
            title: 'Play and Win 1000',
            description: 'Test your knowledge about IPL cricket.',
            coinCost: 100,
            coinReward: 1000,
            questions: [
              {
                id: 's-1',
                text: 'Which team won the first IPL tournament in 2008?',
                options: ['Mumbai Indians', 'Chennai Super Kings', 'Rajasthan Royals', 'Kolkata Knight Riders'],
                correctAnswer: 2,
              },
              {
                id: 's-2',
                text: 'Who is known as Captain Cool in IPL?',
                options: ['Virat Kohli', 'Rohit Sharma', 'MS Dhoni', 'Hardik Pandya'],
                correctAnswer: 2,
              },
              {
                id: 's-3',
                text: 'Which player has scored the most runs in IPL history?',
                options: ['MS Dhoni', 'Virat Kohli', 'Rohit Sharma', 'David Warner'],
                correctAnswer: 1,
              },
            ],
          }
        ],
      }
    ],
  },
  {
    id: 'history',
    name: 'History',
    icon: 'scroll',
    subcategories: [
      {
        id: 'war',
        name: 'War',
        quizzes: [
          {
            id: 'history-war',
            title: 'Play and Win 1000',
            description: 'Test your knowledge about historical wars.',
            coinCost: 100,
            coinReward: 1000,
            questions: [
              {
                id: 'h-1',
                text: 'In which year did World War II end?',
                options: ['1944', '1945', '1946', '1947'],
                correctAnswer: 1,
              },
              {
                id: 'h-2',
                text: 'Who was the British Prime Minister during most of World War II?',
                options: ['Neville Chamberlain', 'Winston Churchill', 'Clement Attlee', 'Anthony Eden'],
                correctAnswer: 1,
              },
              {
                id: 'h-3',
                text: 'Which battle is considered the turning point of World War II?',
                options: ['Battle of Britain', 'Battle of Stalingrad', 'D-Day', 'Battle of Midway'],
                correctAnswer: 1,
              },
            ],
          }
        ],
      }
    ],
  },
  {
    id: 'world',
    name: 'World',
    icon: 'globe',
    subcategories: [
      {
        id: 'landmarks',
        name: 'Famous Landmark',
        quizzes: [
          {
            id: 'world-landmarks',
            title: 'Play and Win 1000',
            description: 'Test your knowledge about world landmarks.',
            coinCost: 100,
            coinReward: 1000,
            questions: [
              {
                id: 'w-1',
                text: 'In which country is Machu Picchu located?',
                options: ['Peru', 'Chile', 'Bolivia', 'Ecuador'],
                correctAnswer: 0,
              },
              {
                id: 'w-2',
                text: 'The Taj Mahal is located in which Indian city?',
                options: ['Delhi', 'Mumbai', 'Agra', 'Jaipur'],
                correctAnswer: 2,
              },
              {
                id: 'w-3',
                text: 'Which landmark is known as the Iron Lady?',
                options: ['Statue of Liberty', 'Eiffel Tower', 'Big Ben', 'Christ the Redeemer'],
                correctAnswer: 1,
              },
            ],
          }
        ],
      }
    ],
  },
];

// Find a quiz by category and subcategory
export function findQuiz(categoryId: string, subcategoryId: string, quizId: string): Quiz | null {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return null;

  const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
  if (!subcategory) return null;

  return subcategory.quizzes.find(quiz => quiz.id === quizId) || null;
}
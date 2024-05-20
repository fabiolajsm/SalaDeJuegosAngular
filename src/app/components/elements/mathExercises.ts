export type MathExercise = {
  category: string;
  question: string;
  correctAnswer: boolean;
};

export const mathExercises: MathExercise[] = [
  // Ejercicios de multiplicación (fuego)
  {
    category: 'fuego',
    question: '¿5 * 5 es igual a 25?',
    correctAnswer: true,
  },
  {
    category: 'fuego',
    question: '¿2 * 8 es igual a 16?',
    correctAnswer: true,
  },
  {
    category: 'fuego',
    question: '¿El resultado de 6 * 9 es 63?',
    correctAnswer: true,
  },
  {
    category: 'fuego',
    question: '¿10 * 4 es igual a 35?',
    correctAnswer: false,
  },
  {
    category: 'fuego',
    question: '¿La multiplicación de 7 por 3 da como resultado 21?',
    correctAnswer: true,
  },
  // Ejercicios de resta (agua)
  {
    category: 'agua',
    question: '¿12 - 8 es igual a 4?',
    correctAnswer: true,
  },
  {
    category: 'agua',
    question: '¿20 - 15 es igual a 4?',
    correctAnswer: false,
  },
  {
    category: 'agua',
    question: '¿La resta de 100 y 50 es 40?',
    correctAnswer: false,
  },
  {
    category: 'agua',
    question: '¿25 - 10 es igual a 15?',
    correctAnswer: true,
  },
  {
    category: 'agua',
    question: '¿La diferencia entre 30 y 12 es 18?',
    correctAnswer: true,
  },
  // Ejercicios de porcentajes (tierra)
  {
    category: 'tierra',
    question: '¿El 25% de 80 es igual a 20?',
    correctAnswer: true,
  },
  {
    category: 'tierra',
    question: '¿El 15% de 200 es igual a 25?',
    correctAnswer: true,
  },
  {
    category: 'tierra',
    question: '¿El 50% de 120 es igual a 50?',
    correctAnswer: false,
  },
  {
    category: 'tierra',
    question: '¿El 10% de 150 es igual a 10?',
    correctAnswer: true,
  },
  {
    category: 'tierra',
    question: '¿El 30% de 50 es igual a 25?',
    correctAnswer: false,
  },
  // Ejercicios de división (aire)
  {
    category: 'aire',
    question: '¿20 / 4 es igual a 5?',
    correctAnswer: true,
  },
  {
    category: 'aire',
    question: '¿50 / 5 es igual a 10?',
    correctAnswer: true,
  },
  {
    category: 'aire',
    question: '¿La división de 100 por 20 es 6?',
    correctAnswer: false,
  },
  {
    category: 'aire',
    question: '¿18 / 3 es igual a 6?',
    correctAnswer: true,
  },
  {
    category: 'aire',
    question: '¿40 / 8 es igual a 4?',
    correctAnswer: true,
  },
];

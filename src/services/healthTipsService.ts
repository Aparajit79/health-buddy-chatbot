// Health Tips Service for providing health-related tips and information

type HealthTip = {
  id: number;
  category: string;
  title: string;
  content: string;
  icon: string;
};

class HealthTipsService {
  private tips: HealthTip[] = [
    { id: 1, category: "nutrition", title: "Stay Hydrated", content: "Drink at least 8 glasses of water daily. Carry a water bottle and set reminders to sip throughout the day.", icon: "💧" },
    { id: 2, category: "fitness", title: "Regular Exercise", content: "Aim for 30 minutes of moderate exercise 5 days a week. Even a brisk walk counts toward your goal!", icon: "🏃" },
    { id: 3, category: "sleep", title: "Sleep Quality", content: "Maintain a consistent sleep schedule of 7-8 hours. Avoid screens 1 hour before bed for better sleep.", icon: "😴" },
    { id: 4, category: "mental", title: "Mindfulness Practice", content: "10 minutes of daily meditation can reduce stress, improve focus, and boost your overall well-being.", icon: "🧘" },
    { id: 5, category: "nutrition", title: "Eat the Rainbow", content: "Include colorful fruits and vegetables in every meal. Different colors provide different essential nutrients.", icon: "🥗" },
    { id: 6, category: "eye", title: "20-20-20 Rule", content: "Every 20 minutes of screen time, look at something 20 feet away for 20 seconds to reduce eye strain.", icon: "👁️" },
    { id: 7, category: "posture", title: "Posture Check", content: "Set hourly reminders to check your posture. Keep shoulders back, chin tucked, and feet flat on the floor.", icon: "🧍" },
    { id: 8, category: "hygiene", title: "Hand Hygiene", content: "Wash hands for 20 seconds with soap, especially before meals and after public spaces. It prevents 80% of infections.", icon: "🧼" },
    { id: 9, category: "immunity", title: "Vitamin D", content: "Get 15-20 minutes of morning sunlight daily. Vitamin D strengthens immunity and improves mood.", icon: "☀️" },
    { id: 10, category: "heart", title: "Heart Health", content: "Limit sodium to under 2,300mg/day. Choose herbs and spices over salt to flavor your food.", icon: "❤️" },
    { id: 11, category: "stress", title: "Deep Breathing", content: "Try the 4-7-8 technique: inhale 4 counts, hold 7, exhale 8. Do this 3 times when stressed for instant calm.", icon: "🌬️" },
    { id: 12, category: "nutrition", title: "Protein Intake", content: "Include protein in every meal — eggs, dal, paneer, chicken, or tofu. It keeps you full and builds muscle.", icon: "🥚" },
    { id: 13, category: "fitness", title: "Stretch Breaks", content: "Take 5-minute stretch breaks every hour. Focus on neck, shoulders, wrists, and lower back.", icon: "🤸" },
    { id: 14, category: "mental", title: "Digital Detox", content: "Take a 30-minute break from all screens daily. Read a book, take a walk, or talk to someone face-to-face.", icon: "📵" },
    { id: 15, category: "sleep", title: "Bedroom Environment", content: "Keep your bedroom cool (65-68°F), dark, and quiet. Use blackout curtains and white noise if needed.", icon: "🛏️" },
    { id: 16, category: "immunity", title: "Probiotics", content: "Include fermented foods like yogurt, kimchi, or idli in your diet. They support gut health and immunity.", icon: "🥛" },
    { id: 17, category: "heart", title: "Walk After Meals", content: "A 10-15 minute walk after meals helps regulate blood sugar and aids digestion. Make it a daily habit!", icon: "🚶" },
    { id: 18, category: "mental", title: "Gratitude Journal", content: "Write down 3 things you're grateful for each night. This simple practice can significantly boost happiness.", icon: "📝" },
    { id: 19, category: "hygiene", title: "Dental Care", content: "Brush twice daily for 2 minutes and floss once. Replace your toothbrush every 3 months.", icon: "🦷" },
    { id: 20, category: "nutrition", title: "Limit Sugar", content: "WHO recommends less than 25g (6 teaspoons) of added sugar daily. Check food labels — sugar hides everywhere!", icon: "🚫" },
    { id: 21, category: "fitness", title: "Staircase Challenge", content: "Take the stairs instead of the elevator. Climbing 7+ flights daily can reduce cardiovascular risk by 30%.", icon: "🪜" },
    { id: 22, category: "stress", title: "Nature Time", content: "Spend at least 20 minutes in nature daily. Green spaces reduce cortisol levels and improve mental clarity.", icon: "🌳" },
    { id: 23, category: "eye", title: "Blink More", content: "We blink 66% less when using screens. Consciously blink every few seconds to keep eyes moist and comfortable.", icon: "😊" },
    { id: 24, category: "nutrition", title: "Fiber First", content: "Eat 25-30g of fiber daily from whole grains, vegetables, and legumes. It improves digestion and heart health.", icon: "🌾" },
    { id: 25, category: "mental", title: "Social Connection", content: "Spend quality time with friends or family daily. Strong social bonds are linked to longer, healthier lives.", icon: "👥" }
  ];

  getRandomTip(): HealthTip {
    const randomIndex = Math.floor(Math.random() * this.tips.length);
    return this.tips[randomIndex];
  }

  getTipsByCategory(category: string): HealthTip[] {
    return this.tips.filter(tip => tip.category === category);
  }

  getAllTips(): HealthTip[] {
    return this.tips;
  }

  getCategories(): string[] {
    return [...new Set(this.tips.map(tip => tip.category))];
  }
}

export const healthTipsService = new HealthTipsService();

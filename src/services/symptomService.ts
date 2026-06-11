export type Symptom =
  | 'fever'
  | 'cold'
  | 'headache'
  | 'cough'
  | 'soreThroat'
  | 'stomachPain'
  | 'rash'
  | 'backPain'
  | 'dizziness'
  | 'fatigue'
  | 'anxiety'
  | 'allergy'
  | 'eyeStrain'
  | 'insomnia'
  | 'dehydration'
  | null;

export interface SymptomResponse {
  message: string;
  advice: string;
}

class SymptomService {
  private currentSymptom: Symptom = null;

  public getCurrentSymptom(): Symptom {
    return this.currentSymptom;
  }

  public setCurrentSymptom(symptom: Symptom) {
    this.currentSymptom = symptom;
  }

  public processMessage(text: string): { message: string; speak: boolean } {
    const lowerText = text.toLowerCase().trim();

    // If we're in a follow-up conversation
    if (this.currentSymptom) {
      const response = this.processSymptomFollowup(lowerText);
      this.currentSymptom = null;
      return { message: response, speak: true };
    }

    // ===== EMERGENCY DETECTION (highest priority) =====
    if (
      lowerText.includes('chest pain') ||
      lowerText.includes('heart attack') ||
      lowerText.includes('can\'t breathe') ||
      lowerText.includes('cannot breathe') ||
      lowerText.includes('difficulty breathing') ||
      lowerText.includes('severe bleeding') ||
      lowerText.includes('unconscious') ||
      lowerText.includes('seizure') ||
      lowerText.includes('stroke') ||
      lowerText.includes('choking') ||
      lowerText.includes('suicidal') ||
      lowerText.includes('overdose')
    ) {
      return {
        message:
          '🚨 EMERGENCY: This sounds like a medical emergency. Please call emergency services IMMEDIATELY (112 in India, 911 in US, 999 in UK, 000 in Australia). Do NOT wait — every second counts. If someone is with you, ask them to call while you stay with the patient.',
        speak: true,
      };
    }

    // ===== GREETINGS & SMALL TALK =====
    if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|hola|namaste)/.test(lowerText)) {
      return {
        message: 'Hello! 👋 I\'m your Health Buddy. I can help you with symptom assessment, health information, BMI calculation, medication reminders, and finding nearby hospitals. How can I help you today?',
        speak: true,
      };
    }

    if (/^(thank|thanks|thank you|thx|ty)/.test(lowerText)) {
      return {
        message: 'You\'re welcome! 😊 Stay healthy and don\'t hesitate to ask if you need anything else.',
        speak: true,
      };
    }

    if (/^(bye|goodbye|see you|take care)/.test(lowerText)) {
      return {
        message: 'Goodbye! Take care of yourself. Remember to stay hydrated, eat well, and get enough sleep. Come back anytime you need health assistance! 💙',
        speak: true,
      };
    }

    if (/^(how are you|what\'s up|how do you do)/.test(lowerText)) {
      return {
        message: 'I\'m doing great, thank you for asking! I\'m here and ready to help you with any health-related questions. What can I assist you with today?',
        speak: true,
      };
    }

    // ===== HEART RATE CHECK =====
    if (lowerText.includes('heart') && (lowerText.includes('rate') || lowerText.includes('beat') || lowerText.includes('pulse'))) {
      return { message: 'heart_rate_check', speak: false };
    }

    // ===== APPOINTMENT =====
    if (lowerText.includes('appointment') || lowerText.includes('book') || (lowerText.includes('see') && lowerText.includes('doctor'))) {
      return {
        message: 'Would you like to book an appointment with a doctor? You can go to the Appointments tab to schedule one. We have General Physicians, Cardiologists, Pediatricians, Dermatologists, Orthopedics, and ENT Specialists available.',
        speak: true,
      };
    }

    // ===== BMI =====
    if (lowerText.includes('bmi') || lowerText.includes('body mass') || (lowerText.includes('weight') && lowerText.includes('check'))) {
      return {
        message: 'You can calculate your BMI using the BMI Calculator in the Wellness tab! Just enter your height and weight, and it will tell you your Body Mass Index category. A healthy BMI is between 18.5 and 24.9.',
        speak: true,
      };
    }

    // ===== MEDICATION =====
    if (lowerText.includes('medication') || lowerText.includes('medicine') || lowerText.includes('reminder') || lowerText.includes('pill')) {
      return {
        message: 'You can set up medication reminders in the Appointments tab! Add your medication name, dosage, and time, and I\'ll remind you when it\'s time to take them.',
        speak: true,
      };
    }

    // ===== HOSPITAL =====
    if (lowerText.includes('hospital') || lowerText.includes('clinic') || lowerText.includes('nearby') || lowerText.includes('emergency room')) {
      return {
        message: 'You can find nearby hospitals using the Hospitals tab! It will show you the closest hospitals to your location on a map. You can click on any hospital to see its details.',
        speak: true,
      };
    }

    // ===== HELP =====
    if (lowerText.includes('help') || lowerText.includes('what can you do') || lowerText.includes('features')) {
      return {
        message:
          'I can help you with:\n\n💬 **Symptom Assessment** — Describe your symptoms (fever, cold, headache, cough, sore throat, stomach pain, back pain, dizziness, fatigue, anxiety, allergies, eye strain, insomnia, rash)\n❤️ **Heart Rate Check** — Quick simulated vitals check\n📅 **Appointments** — Book doctor appointments\n💊 **Medication Reminders** — Set pill reminders\n⚖️ **BMI Calculator** — Check your body mass index\n🏥 **Hospital Finder** — Find nearby hospitals\n🚨 **Emergency Detection** — Urgent care guidance\n\nJust describe what you\'re feeling and I\'ll guide you!',
        speak: true,
      };
    }

    // ===== SYMPTOM DETECTION =====
    if (lowerText.includes('fever') || lowerText.includes('high temperature') || lowerText.includes('feeling hot')) {
      this.currentSymptom = 'fever';
      return { message: 'I understand you might have a fever. 🌡️ Do you also have chills, body aches, or sweating?', speak: true };
    }
    if (lowerText.includes('cold') || lowerText.includes('runny nose') || lowerText.includes('sneezing') || lowerText.includes('stuffy nose')) {
      this.currentSymptom = 'cold';
      return { message: 'It sounds like you might have a cold. 🤧 Are you experiencing sneezing, congestion, or watery eyes?', speak: true };
    }
    if (lowerText.includes('headache') || lowerText.includes('head pain') || lowerText.includes('migraine') || lowerText.includes('head hurts')) {
      this.currentSymptom = 'headache';
      return { message: 'I understand you\'re experiencing head pain. 🤕 How long have you had this? Is it constant or does it come and go? Is it on one side or both?', speak: true };
    }
    if (lowerText.includes('cough') || lowerText.includes('dry cough') || lowerText.includes('chest congestion') || lowerText.includes('wheezing')) {
      this.currentSymptom = 'cough';
      return { message: 'You mentioned coughing. Is it a dry cough or are you coughing up mucus? How long have you been coughing? Any shortness of breath?', speak: true };
    }
    if (lowerText.includes('sore throat') || lowerText.includes('throat pain') || lowerText.includes('throat hurts') || lowerText.includes('painful swallowing')) {
      this.currentSymptom = 'soreThroat';
      return { message: 'I see you have a sore throat. Do you also have difficulty swallowing? Any visible redness or white patches when you check your throat?', speak: true };
    }
    if (lowerText.includes('stomach') || lowerText.includes('nausea') || lowerText.includes('vomiting') || lowerText.includes('abdomen') || lowerText.includes('belly pain') || lowerText.includes('diarrhea')) {
      this.currentSymptom = 'stomachPain';
      return { message: 'I understand you\'re having stomach issues. 🤢 Are you experiencing nausea, vomiting, diarrhea, or bloating along with the pain? When did it start?', speak: true };
    }
    if (lowerText.includes('rash') || lowerText.includes('skin irritation') || lowerText.includes('itchy skin') || lowerText.includes('hives') || lowerText.includes('skin bumps')) {
      this.currentSymptom = 'rash';
      return { message: 'You mentioned a skin issue. Where on your body is it? Is it itchy, painful, or spreading? Have you been exposed to any new substances recently?', speak: true };
    }
    if (lowerText.includes('back pain') || lowerText.includes('backache') || lowerText.includes('spine') || lowerText.includes('lower back')) {
      this.currentSymptom = 'backPain';
      return { message: 'I understand you\'re experiencing back pain. Is it in the upper, middle, or lower back? Did it start suddenly or has it been building up? Does it radiate to your legs?', speak: true };
    }
    if (lowerText.includes('dizzy') || lowerText.includes('dizziness') || lowerText.includes('lightheaded') || lowerText.includes('vertigo') || lowerText.includes('room spinning')) {
      this.currentSymptom = 'dizziness';
      return { message: 'You\'re feeling dizzy. 😵 Does the room seem to spin, or do you feel faint? Have you been eating and drinking enough today? Any recent changes in medication?', speak: true };
    }
    if (lowerText.includes('tired') || lowerText.includes('fatigue') || lowerText.includes('exhausted') || lowerText.includes('no energy') || lowerText.includes('lethargic')) {
      this.currentSymptom = 'fatigue';
      return { message: 'I hear you\'re feeling fatigued. 😴 How long has this been going on? Are you sleeping well? Have you noticed any changes in appetite or mood?', speak: true };
    }
    if (lowerText.includes('anxiety') || lowerText.includes('anxious') || lowerText.includes('panic') || lowerText.includes('stressed') || lowerText.includes('worried') || lowerText.includes('nervous')) {
      this.currentSymptom = 'anxiety';
      return { message: 'I\'m sorry to hear you\'re feeling anxious. 💙 Are you experiencing physical symptoms like a racing heart, sweating, or trouble breathing? How long have you been feeling this way?', speak: true };
    }
    if (lowerText.includes('allergy') || lowerText.includes('allergic') || lowerText.includes('allergies') || lowerText.includes('hay fever') || lowerText.includes('pollen')) {
      this.currentSymptom = 'allergy';
      return { message: 'It sounds like you might be dealing with allergies. 🌿 What symptoms are you experiencing — sneezing, itchy eyes, skin reactions, or breathing issues? Do you know what might have triggered it?', speak: true };
    }
    if (lowerText.includes('eye strain') || lowerText.includes('eye pain') || lowerText.includes('blurry vision') || lowerText.includes('dry eyes') || lowerText.includes('eyes hurt')) {
      this.currentSymptom = 'eyeStrain';
      return { message: 'You\'re having eye issues. 👁️ How long have you been on a screen today? Are your eyes dry, watery, or painful? Do you experience headaches along with the eye strain?', speak: true };
    }
    if (lowerText.includes('insomnia') || lowerText.includes('can\'t sleep') || lowerText.includes('trouble sleeping') || lowerText.includes('sleepless') || lowerText.includes('not sleeping')) {
      this.currentSymptom = 'insomnia';
      return { message: 'Trouble sleeping can be really frustrating. 🌙 How long has this been going on? Do you have trouble falling asleep, staying asleep, or both? Do you consume caffeine or use screens before bed?', speak: true };
    }
    if (lowerText.includes('dehydrat') || lowerText.includes('thirsty') || lowerText.includes('dry mouth') || lowerText.includes('not drinking enough')) {
      this.currentSymptom = 'dehydration';
      return { message: 'Hydration is important! 💧 Are you experiencing dark urine, dry mouth, dizziness, or headaches? How much water have you had today?', speak: true };
    }

    // Default
    return {
      message: 'I\'m not sure I understood that. Could you try describing your symptoms more specifically? For example, you can say things like "I have a headache", "I feel dizzy", "I have a fever", or type "help" to see everything I can do.',
      speak: true,
    };
  }

  private processSymptomFollowup(text: string): string {
    switch (this.currentSymptom) {
      case 'fever':
        return '🌡️ Based on your symptoms, here\'s my recommendation:\n\n**Immediate Care:**\n• Take Paracetamol (500mg) or Ibuprofen (400mg) for fever\n• Drink plenty of fluids — water, oral rehydration solutions, clear soups\n• Rest in a cool, comfortable environment\n• Apply a cool, damp cloth to your forehead\n\n**Watch For (See a Doctor If):**\n• Fever above 103°F (39.4°C)\n• Fever lasting more than 3 days\n• Severe headache, stiff neck, or confusion\n• Rash or difficulty breathing\n\n⚕️ *This is general guidance, not a medical diagnosis. Please consult a doctor for persistent symptoms.*';

      case 'cold':
        return '🤧 For your cold symptoms:\n\n**Immediate Care:**\n• Take antihistamines (like Cetirizine) for congestion and sneezing\n• Use saline nasal spray for stuffiness\n• Drink warm fluids — herbal tea with honey, warm water with lemon\n• Steam inhalation 2-3 times a day\n• Get plenty of rest\n\n**Watch For (See a Doctor If):**\n• Symptoms worsen after 7-10 days\n• High fever develops\n• Severe sinus pain or ear pain\n• Shortness of breath\n\n⚕️ *This is general guidance, not a medical diagnosis. Please consult a doctor for persistent symptoms.*';

      case 'headache':
        return '🤕 For your headache:\n\n**Immediate Care:**\n• Take Paracetamol (500mg) or Ibuprofen (400mg)\n• Rest in a quiet, dark room\n• Apply a cold compress to your forehead or temples\n• Stay hydrated — dehydration is a common headache trigger\n• Gently massage your temples and neck\n\n**Prevention Tips:**\n• Follow the 20-20-20 rule for screen time (every 20 min, look at something 20 feet away for 20 sec)\n• Maintain a regular sleep schedule\n• Manage stress through deep breathing or meditation\n\n**Watch For (See a Doctor If):**\n• Sudden severe headache ("worst headache ever")\n• Headache with confusion, stiff neck, or vision changes\n• Headaches becoming more frequent\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      case 'cough':
        return '🫁 For your cough:\n\n**Immediate Care:**\n• Stay hydrated — warm water, honey tea (1 tbsp honey in warm water)\n• Use cough drops or lozenges\n• Try steam inhalation with eucalyptus oil\n• Sleep with an extra pillow to elevate your head\n• Avoid smoke and strong odors\n\n**For Dry Cough:** Use a humidifier and try honey-based remedies\n**For Wet Cough:** Stay upright, practice gentle coughing to clear mucus\n\n**Watch For (See a Doctor If):**\n• Coughing up blood or colored mucus\n• Difficulty breathing or wheezing\n• Cough lasting more than 3 weeks\n• Chest pain when coughing\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      case 'soreThroat':
        return '🗣️ For your sore throat:\n\n**Immediate Care:**\n• Gargle with warm salt water (½ tsp salt in 8oz warm water) every 2-3 hours\n• Drink warm liquids — herbal tea, warm water with honey and lemon\n• Use throat lozenges or spray\n• Take Paracetamol or Ibuprofen for pain\n• Avoid irritants like smoking or very cold drinks\n\n**Home Remedies:**\n• Turmeric milk (warm milk + ½ tsp turmeric)\n• Honey and ginger tea\n\n**Watch For (See a Doctor If):**\n• Severe pain or difficulty swallowing/breathing\n• White patches on throat (possible strep)\n• Sore throat lasting more than a week\n• Fever above 101°F\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      case 'stomachPain':
        return '🤢 For your stomach issues:\n\n**Immediate Care:**\n• Eat bland foods — rice, toast, bananas, boiled potatoes (BRAT diet)\n• Stay hydrated with small, frequent sips of water or ORS\n• Avoid spicy, fatty, or dairy-heavy foods\n• Try ginger tea or peppermint tea for nausea\n• Rest and avoid lying flat right after eating\n\n**For Acid Reflux:** Try antacids; avoid caffeine and citrus\n**For Diarrhea:** Use ORS; avoid dairy and greasy food\n\n**Watch For (See a Doctor If):**\n• Severe or sudden sharp pain\n• Blood in stool or vomit\n• Persistent vomiting (unable to keep fluids down)\n• Pain lasting more than 48 hours\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      case 'rash':
        return '🩹 For your skin issue:\n\n**Immediate Care:**\n• Avoid scratching — keep nails short\n• Apply cold compresses to reduce itching\n• Use calamine lotion or hydrocortisone cream (1%)\n• Take an antihistamine (Cetirizine) for itching\n• Wear loose, breathable clothing\n• Use mild, fragrance-free soap\n\n**Watch For (See a Doctor If):**\n• Rash spreads rapidly or blisters\n• Accompanied by fever or joint pain\n• Signs of infection (warmth, swelling, pus)\n• Allergic reaction (swelling of face/tongue, difficulty breathing)\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      case 'backPain':
        return '🦴 For your back pain:\n\n**Immediate Care:**\n• Apply ice for the first 48 hours, then switch to heat\n• Take Ibuprofen or Paracetamol for pain\n• Gentle stretching — cat-cow stretch, knee-to-chest stretch\n• Maintain good posture — sit with back supported\n• Avoid heavy lifting\n\n**Prevention:**\n• Strengthen core muscles with regular exercise\n• Use an ergonomic chair and desk setup\n• Take breaks every 30 minutes if sitting\n• Sleep on a medium-firm mattress\n\n**Watch For (See a Doctor If):**\n• Pain radiates down legs (sciatica)\n• Numbness or tingling in legs\n• Loss of bladder or bowel control\n• Pain after an injury or fall\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      case 'dizziness':
        return '😵 For your dizziness:\n\n**Immediate Care:**\n• Sit or lie down immediately to prevent falls\n• Drink water — dehydration is a common cause\n• Eat something if you haven\'t eaten recently\n• Take slow, deep breaths\n• Avoid sudden head movements\n\n**Common Causes:**\n• Dehydration or low blood sugar\n• Standing up too quickly\n• Inner ear issues (vertigo)\n• Low blood pressure\n\n**Watch For (See a Doctor If):**\n• Accompanied by chest pain or irregular heartbeat\n• Sudden severe headache\n• Numbness, weakness, or slurred speech (stroke signs)\n• Recurrent episodes\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      case 'fatigue':
        return '😴 For your fatigue:\n\n**Immediate Steps:**\n• Ensure you\'re sleeping 7-9 hours per night\n• Stay hydrated — aim for 8 glasses of water daily\n• Eat balanced meals with iron-rich foods (spinach, lentils, red meat)\n• Take short walks — light exercise can boost energy\n• Limit caffeine after 2 PM\n\n**Lifestyle Changes:**\n• Maintain a consistent sleep schedule\n• Practice stress management (meditation, deep breathing)\n• Limit screen time before bed\n• Consider Vitamin D and B12 supplementation (consult doctor first)\n\n**Watch For (See a Doctor If):**\n• Fatigue lasting more than 2 weeks\n• Accompanied by unexplained weight loss\n• Persistent low mood or loss of interest\n• Shortness of breath or heart palpitations\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      case 'anxiety':
        return '💙 For your anxiety:\n\n**Immediate Relief:**\n• Try the 4-7-8 breathing technique: Breathe in for 4 counts, hold for 7, exhale for 8\n• Ground yourself: Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste\n• Take a slow walk or do gentle stretching\n• Limit caffeine and sugar intake\n\n**Daily Practices:**\n• 10 minutes of meditation or mindfulness daily\n• Regular physical exercise (30 min/day)\n• Journaling your thoughts and worries\n• Maintain social connections — talk to someone you trust\n\n**Watch For (See a Professional If):**\n• Anxiety interferes with daily activities\n• Panic attacks (racing heart, shortness of breath, feeling of doom)\n• Persistent worry lasting more than 6 months\n• Using alcohol or substances to cope\n\n💙 *Remember: Seeking help is a sign of strength, not weakness.*';

      case 'allergy':
        return '🌿 For your allergy symptoms:\n\n**Immediate Care:**\n• Take an antihistamine (Cetirizine or Loratadine)\n• For nasal symptoms: Use saline nasal spray\n• For itchy eyes: Use cold compresses or antihistamine eye drops\n• For skin reactions: Apply calamine or hydrocortisone cream\n• Avoid the allergen if identified\n\n**Prevention:**\n• Keep windows closed during high pollen days\n• Shower after spending time outdoors\n• Use dust-mite covers on pillows and mattresses\n• Keep pets out of the bedroom\n\n**Watch For (Seek Emergency Help If):**\n• Difficulty breathing or throat swelling (anaphylaxis)\n• Severe swelling of face, lips, or tongue\n• Dizziness or loss of consciousness\n• Use EpiPen if prescribed and call emergency services\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      case 'eyeStrain':
        return '👁️ For your eye strain:\n\n**Immediate Relief:**\n• Follow the 20-20-20 rule: Every 20 min, look at something 20 feet away for 20 seconds\n• Blink frequently — we blink less when looking at screens\n• Use artificial tears or lubricating eye drops\n• Adjust screen brightness to match surrounding light\n• Reduce screen glare with a matte filter\n\n**Workspace Setup:**\n• Position screen 20-26 inches from eyes\n• Top of screen should be at or below eye level\n• Increase text size for comfortable reading\n• Use dark mode when possible\n\n**Watch For (See a Doctor If):**\n• Persistent pain or vision changes\n• Seeing floaters or flashes of light\n• Severe redness or discharge\n• Headaches that worsen despite rest\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      case 'insomnia':
        return '🌙 For your sleep issues:\n\n**Sleep Hygiene Tips:**\n• Go to bed and wake up at the same time every day\n• Make your bedroom cool, dark, and quiet\n• Avoid screens 1 hour before bed (blue light blocks melatonin)\n• No caffeine after 2 PM, no heavy meals before bed\n• Try a warm bath or shower 1-2 hours before bedtime\n\n**Relaxation Techniques:**\n• Progressive muscle relaxation: Tense and release each muscle group\n• Deep breathing or meditation apps\n• Read a physical book (not a screen)\n• Listen to calming music or white noise\n\n**Watch For (See a Doctor If):**\n• Insomnia lasting more than 3-4 weeks\n• Excessive daytime sleepiness affecting work/safety\n• Snoring loudly or gasping during sleep (sleep apnea)\n• Using sleep aids regularly\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      case 'dehydration':
        return '💧 For dehydration:\n\n**Immediate Steps:**\n• Drink water in small, frequent sips — don\'t gulp\n• Try oral rehydration solution (ORS) for faster rehydration\n• Eat water-rich foods: watermelon, cucumber, oranges\n• Avoid alcohol and caffeine — they worsen dehydration\n• Rest in a cool environment\n\n**Daily Hydration Goals:**\n• Men: ~3.7 liters (13 cups) per day\n• Women: ~2.7 liters (9 cups) per day\n• More if exercising, hot weather, or illness\n\n**Signs of Dehydration:**\n• Dark yellow urine\n• Dry mouth and lips\n• Headache and dizziness\n• Fatigue and confusion\n\n**Watch For (See a Doctor If):**\n• Unable to keep fluids down\n• Rapid heartbeat or very low urine output\n• Confusion or extreme drowsiness\n• Dehydration in young children or elderly\n\n⚕️ *This is general guidance, not a medical diagnosis.*';

      default:
        return 'I\'m not sure how to help with that specific issue. Could you try describing your symptoms or questions differently? Type "help" to see everything I can assist with.';
    }
  }
}

export const symptomService = new SymptomService();

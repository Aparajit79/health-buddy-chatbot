import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, AlertTriangle, Heart, Shield } from "lucide-react";

const EmergencyTab = () => {
  const emergencyNumbers = [
    { name: "National Emergency Number", number: "112", description: "All emergencies (India)", icon: Phone },
    { name: "Ambulance", number: "108", description: "Emergency medical services", icon: Heart },
    { name: "Police", number: "100", description: "Law enforcement", icon: Shield },
    { name: "Fire Brigade", number: "101", description: "Fire emergencies", icon: AlertTriangle },
    { name: "Women Helpline", number: "1091", description: "Women in distress", icon: Phone },
    { name: "Child Helpline", number: "1098", description: "Children in need", icon: Phone },
    { name: "Mental Health Helpline", number: "08046110007", description: "NIMHANS helpline (24/7)", icon: Heart },
    { name: "Poison Control", number: "1066", description: "Poisoning emergencies", icon: AlertTriangle },
  ];

  const firstAidGuides = [
    {
      title: "🫁 CPR (Cardiopulmonary Resuscitation)",
      steps: [
        "Check if the person is responsive — tap their shoulders and shout",
        "Call emergency services (112) immediately",
        "Place the person on a firm, flat surface",
        "Place heel of one hand on center of chest, other hand on top",
        "Push hard and fast — 2 inches deep, 100-120 compressions/min",
        "After 30 compressions, give 2 rescue breaths (tilt head, lift chin)",
        "Continue until help arrives or person starts breathing",
      ],
    },
    {
      title: "🩸 Severe Bleeding",
      steps: [
        "Call emergency services (112)",
        "Apply direct pressure with a clean cloth or bandage",
        "Do NOT remove the cloth — add more layers if blood soaks through",
        "If possible, elevate the injured area above heart level",
        "Apply a tourniquet only as a last resort above the wound",
        "Keep the person warm and calm until help arrives",
      ],
    },
    {
      title: "🔥 Burns",
      steps: [
        "Remove the person from the source of the burn",
        "Cool the burn under cool running water for 10-20 minutes",
        "Do NOT use ice, butter, or toothpaste",
        "Remove rings, watches, or tight items before swelling starts",
        "Cover with a sterile, non-fluffy dressing or cling film",
        "Seek medical help for burns larger than the person's palm",
      ],
    },
    {
      title: "😵 Choking (Adult)",
      steps: [
        "Ask 'Are you choking?' — if they can't speak or cough, act fast",
        "Stand behind the person, lean them slightly forward",
        "Give 5 sharp back blows between shoulder blades with heel of hand",
        "If back blows don't work, try 5 abdominal thrusts (Heimlich maneuver)",
        "Place fist just above navel, grab with other hand, pull inward and upward",
        "Alternate between 5 back blows and 5 abdominal thrusts",
        "Call 112 if the object doesn't dislodge",
      ],
    },
    {
      title: "⚡ Seizure",
      steps: [
        "Stay calm — time the seizure",
        "Clear the area of hard or sharp objects",
        "Place something soft under their head",
        "Do NOT restrain them or put anything in their mouth",
        "Turn them on their side once the seizure stops (recovery position)",
        "Call 112 if seizure lasts more than 5 minutes or person doesn't regain consciousness",
      ],
    },
    {
      title: "🐍 Snake Bite",
      steps: [
        "Call emergency services (112) immediately",
        "Keep the person still and calm — movement spreads venom faster",
        "Remove jewelry and tight clothing near the bite",
        "Keep the bitten area below heart level if possible",
        "Do NOT cut the wound, try to suck out venom, or apply a tourniquet",
        "Note the snake's appearance if possible (for antivenom selection)",
        "Get to a hospital with antivenom as fast as possible",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Numbers */}
      <Card className="bg-gradient-to-br from-red-950 to-gray-900 border-red-500/50 border shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-700 to-red-800 rounded-t-lg">
          <CardTitle className="text-white flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            Emergency Contact Numbers
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          {emergencyNumbers.map((item, index) => (
            <a
              key={index}
              href={`tel:${item.number}`}
              className="block bg-gray-800/80 hover:bg-gray-700/80 border border-red-700/30 hover:border-red-500/50 rounded-lg p-4 transition-all duration-300 group"
            >
              <div className="flex items-center mb-2">
                <item.icon className="h-5 w-5 text-red-400 mr-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-2xl text-red-400">{item.number}</span>
              </div>
              <p className="font-medium text-white text-sm">{item.name}</p>
              <p className="text-xs text-gray-400">{item.description}</p>
            </a>
          ))}
        </CardContent>
      </Card>

      {/* First Aid Guides */}
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500 border shadow-lg">
        <CardHeader className="bg-gradient-to-r from-cyan-700 to-blue-800 rounded-t-lg">
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            First Aid Quick Guides
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {firstAidGuides.map((guide, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-700 to-gray-800 border-cyan-700/30 border shadow-md hover:shadow-cyan-700/20 hover:border-cyan-600/50 transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-cyan-300">{guide.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ol className="space-y-2">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex text-sm text-gray-300">
                      <span className="font-bold text-cyan-400 mr-2 flex-shrink-0">{stepIndex + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="text-center text-sm text-gray-400 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <AlertTriangle className="h-4 w-4 inline mr-2 text-yellow-500" />
        <strong>Disclaimer:</strong> This information is for educational purposes only and is not a substitute for professional medical advice.
        In case of a medical emergency, always call your local emergency number immediately.
      </div>
    </div>
  );
};

export default EmergencyTab;

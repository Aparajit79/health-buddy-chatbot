
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Activity, Pill, Stethoscope, Heart, Cross, LoaderCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface HealthInfoTabProps {
  isLoading?: boolean;
}

const HealthInfoTab = ({ isLoading = false }: HealthInfoTabProps) => {
  const commonHealthTopics = [
    {
      title: "Fever",
      content: "A body temperature above 98.6°F (37°C). Common causes: infections, vaccinations, heat exposure. Home care: rest, fluids, paracetamol. See a doctor if fever exceeds 103°F or lasts more than 3 days.",
      icon: Thermometer
    },
    {
      title: "Common Cold",
      content: "Viral infection of the nose and throat. Symptoms: runny nose, sore throat, cough, congestion. Home care: rest, warm fluids, steam inhalation, vitamin C. Usually resolves in 7-10 days.",
      icon: Activity
    },
    {
      title: "Headache",
      content: "Can be tension, migraine, or cluster type. Triggers: stress, dehydration, lack of sleep, screen time. Home care: rest in dark room, cold compress, hydration, OTC pain relievers. Seek help if sudden or severe.",
      icon: Pill
    },
    {
      title: "Cough",
      content: "Reflex to clear airways. Can be dry or productive. Home care: honey, warm fluids, steam inhalation, cough drops. See a doctor if coughing blood, lasting 3+ weeks, or with breathing difficulty.",
      icon: Stethoscope
    },
    {
      title: "Hypertension",
      content: "High blood pressure (above 140/90 mmHg). Often has no symptoms. Risk factors: salt intake, obesity, stress, family history. Prevention: low-sodium diet, exercise, stress management, regular monitoring.",
      icon: Heart
    },
    {
      title: "Diabetes",
      content: "Chronic condition affecting blood sugar regulation. Types: Type 1 (autoimmune), Type 2 (lifestyle). Symptoms: frequent urination, excessive thirst, fatigue. Management: diet, exercise, medication, monitoring.",
      icon: Pill
    },
    {
      title: "Sore Throat",
      content: "Pain or irritation worsening when swallowing. Causes: viral/bacterial infections, allergies. Home care: salt water gargle, warm liquids, honey, lozenges. See a doctor if white patches appear or pain is severe.",
      icon: Cross
    },
    {
      title: "Stomach Pain",
      content: "Ranges from mild to severe. Common causes: indigestion, acid reflux, gastritis, food poisoning. Home care: BRAT diet, ginger tea, avoid spicy food. Seek help if severe, persistent, or bloody stool.",
      icon: Pill
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500 border shadow-lg">
          <CardHeader className="bg-gradient-to-r from-cyan-700 to-blue-800 rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
              Loading Health Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {Array(8).fill(0).map((_, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 border-cyan-700/50 border shadow-md">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-24 bg-gray-600" />
                </CardHeader>
                <CardContent className="pt-0">
                  <Skeleton className="h-4 w-full bg-gray-600 mb-2" />
                  <Skeleton className="h-4 w-3/4 bg-gray-600 mb-2" />
                  <Skeleton className="h-4 w-5/6 bg-gray-600" />
                </CardContent>

              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500 border shadow-lg">
        <CardHeader className="bg-gradient-to-r from-cyan-700 to-blue-800 rounded-t-lg">
          <CardTitle className="text-white flex items-center">
            <Pill className="mr-2 h-5 w-5" />
            Health Information Library
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {commonHealthTopics.map((topic, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 border-cyan-700/50 border shadow-md hover:shadow-cyan-700/20 hover:border-cyan-600 transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-cyan-300 flex items-center">
                  <topic.icon className="mr-2 h-4 w-4" />
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-300">{topic.content}</p>
              </CardContent>

            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500 border shadow-lg">
        <CardHeader className="bg-gradient-to-r from-cyan-700 to-blue-800 rounded-t-lg">
          <CardTitle className="text-white flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Prevention Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg border border-cyan-700/30 hover:border-cyan-600/50 transition-colors duration-300">
            <h3 className="font-medium text-cyan-300 mb-2 flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Regular Exercise
            </h3>
            <p className="text-sm text-gray-300">Aim for at least 150 minutes of moderate activity per week. Regular exercise helps maintain weight and reduces risk of chronic diseases.</p>
          </div>
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg border border-cyan-700/30 hover:border-cyan-600/50 transition-colors duration-300">
            <h3 className="font-medium text-cyan-300 mb-2 flex items-center">
              <Pill className="mr-2 h-4 w-4" />
              Balanced Diet
            </h3>
            <p className="text-sm text-gray-300">Focus on fruits, vegetables, whole grains and lean proteins. Limit processed foods, sugars and saturated fats.</p>
          </div>
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg border border-cyan-700/30 hover:border-cyan-600/50 transition-colors duration-300">
            <h3 className="font-medium text-cyan-300 mb-2 flex items-center">
              <Stethoscope className="mr-2 h-4 w-4" />
              Adequate Sleep
            </h3>
            <p className="text-sm text-gray-300">Adults should aim for 7-9 hours of quality sleep per night. Good sleep improves immune function and mental health.</p>
          </div>
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg border border-cyan-700/30 hover:border-cyan-600/50 transition-colors duration-300">
            <h3 className="font-medium text-cyan-300 mb-2 flex items-center">
              <Thermometer className="mr-2 h-4 w-4" />
              Regular Check-ups
            </h3>
            <p className="text-sm text-gray-300">Schedule routine medical check-ups to catch potential health issues early. Preventive care is key to maintaining long-term health.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthInfoTab;

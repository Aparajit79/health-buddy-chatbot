import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { appointmentService, Appointment } from "@/services/appointmentService";
import MedicationReminder from "@/components/health-assistant/MedicationReminder";

const AppointmentTab = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctor, setDoctor] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setAppointments(appointmentService.fetchAppointments());
  }, []);

  const handleBookAppointment = () => {
    if (!name || !email || !date || !time || !doctor) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to book your appointment.",
        variant: "destructive",
      });
      return;
    }

    try {
      const newAppointment = appointmentService.createAppointment({
        name,
        email,
        date,
        time,
        doctor,
      });

      setAppointments(appointmentService.fetchAppointments());

      toast({
        title: "Appointment Booked!",
        description: `Your appointment with Dr. ${doctor} is scheduled for ${date} at ${time}.`,
      });

      setName("");
      setEmail("");
      setDate("");
      setTime("");
      setDoctor("");
    } catch (error) {
      toast({
        title: "Failed to book appointment",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancelAppointment = (id: string) => {
    appointmentService.deleteAppointment(id);
    setAppointments(appointmentService.fetchAppointments());
    toast({
      title: "Appointment cancelled",
      description: "The appointment has been cancelled successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="bg-gray-700">
              <CardTitle className="text-cyan-400">Book an Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">Date</label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium">Time</label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="doctor" className="text-sm font-medium">Select Doctor</label>
                <Select value={doctor} onValueChange={setDoctor}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Smith">Dr. Smith - General Physician</SelectItem>
                    <SelectItem value="Johnson">Dr. Johnson - Cardiologist</SelectItem>
                    <SelectItem value="Williams">Dr. Williams - Pediatrician</SelectItem>
                    <SelectItem value="Brown">Dr. Brown - Dermatologist</SelectItem>
                    <SelectItem value="Patel">Dr. Patel - Orthopedic</SelectItem>
                    <SelectItem value="Kumar">Dr. Kumar - ENT Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleBookAppointment}
                className="w-full bg-cyan-600 hover:bg-cyan-700"
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="bg-gray-700">
              <CardTitle className="text-cyan-400">Your Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 ? (
                <p className="text-center py-8 text-gray-400">No appointments scheduled yet.</p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <Card key={appointment.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Dr. {appointment.doctor}</p>
                            <p className="text-sm text-gray-300">{appointment.date} at {appointment.time}</p>
                            <p className="text-xs text-gray-400">{appointment.name} • {appointment.email}</p>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Medication Reminders section */}
      <MedicationReminder />
    </div>
  );
};

export default AppointmentTab;

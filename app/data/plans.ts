export type Exercise = {
  name: string;
  sets: string;
  alt?: string;
};

export type WorkoutDay = {
  day: string;
  focus: string;
  exercises: Exercise[];
};

export type WorkoutPlan = {
  id: string;
  label: string;
  location: "gym" | "home";
  days: WorkoutDay[];
  restNote: string;
  equipmentNote?: string;
};

const FAILURE_NOTE = "2 sets, performed to technical failure (form breaks down)";
const FAILURE_NOTE_1X = "1 set, performed to technical failure";

function ex(name: string, sets: string, alt?: string): Exercise {
  return { name, sets, alt };
}

export const GYM_PLANS: Record<string, WorkoutPlan> = {
  "3day": {
    id: "3day",
    label: "3 day gym plan",
    location: "gym",
    days: [
      {
        day: "Monday",
        focus: "Chest, biceps, delts",
        exercises: [
          ex("Incline chest press", FAILURE_NOTE),
          ex("High to low cable flies", FAILURE_NOTE),
          ex("Cable lateral raises", FAILURE_NOTE, "or cable front raises — pick one"),
          ex("Cable curls", FAILURE_NOTE, "or dumbbell curls — pick one"),
        ],
      },
      {
        day: "Wednesday",
        focus: "Legs / abs",
        exercises: [
          ex("Leg press or squats", FAILURE_NOTE, "or leg extensions — pick one"),
          ex("Romanian deadlifts", FAILURE_NOTE, "or hamstring curls — pick one"),
          ex("Calf raises", FAILURE_NOTE),
          ex("Cable crunches", FAILURE_NOTE, "or hanging leg raises — pick one"),
        ],
      },
      {
        day: "Friday",
        focus: "Back, rear delts, triceps",
        exercises: [
          ex("Lat pulldowns", FAILURE_NOTE, "or pullups — pick one"),
          ex("Wide grip rows", FAILURE_NOTE),
          ex("Cable rear delt flies", FAILURE_NOTE),
          ex("Tricep pushdowns", FAILURE_NOTE, "or skull crushers — pick one"),
        ],
      },
    ],
    restNote: "Tuesday, Thursday, Saturday, Sunday are rest days.",
  },
  "5day": {
    id: "5day",
    label: "5 day gym plan",
    location: "gym",
    days: [
      {
        day: "Monday",
        focus: "Chest, biceps, delts",
        exercises: [
          ex("Incline chest press", FAILURE_NOTE),
          ex("High to low cable flies", FAILURE_NOTE),
          ex("Cable lateral raises", FAILURE_NOTE, "or cable front raises — pick one"),
          ex("Cable curls", FAILURE_NOTE, "or dumbbell curls — pick one"),
        ],
      },
      {
        day: "Tuesday",
        focus: "Legs / abs",
        exercises: [
          ex("Leg press or squats", FAILURE_NOTE, "or leg extensions — pick one"),
          ex("Romanian deadlifts", FAILURE_NOTE, "or hamstring curls — pick one"),
          ex("Calf raises", FAILURE_NOTE),
          ex("Cable crunches", FAILURE_NOTE, "or hanging leg raises — pick one"),
        ],
      },
      {
        day: "Wednesday",
        focus: "Back, rear delts, triceps",
        exercises: [
          ex("Lat pulldowns", FAILURE_NOTE, "or pullups — pick one"),
          ex("Wide grip rows", FAILURE_NOTE),
          ex("Cable rear delt flies", FAILURE_NOTE),
          ex("Tricep pushdowns", FAILURE_NOTE, "or skull crushers — pick one"),
        ],
      },
      {
        day: "Thursday",
        focus: "Upper + abs",
        exercises: [
          ex("Chest press", FAILURE_NOTE),
          ex("Lat pulldowns", FAILURE_NOTE, "or pullups — pick one"),
          ex("Cable curls", FAILURE_NOTE_1X, "or dumbbell curls — pick one"),
          ex("Tricep pushdowns", FAILURE_NOTE_1X, "or skull crushers — pick one"),
          ex("Lateral raises", FAILURE_NOTE_1X),
          ex("Cable crunches", FAILURE_NOTE_1X, "or hanging leg raises — pick one"),
        ],
      },
      {
        day: "Friday",
        focus: "Lower",
        exercises: [
          ex("Leg press or squats", FAILURE_NOTE),
          ex("Leg extensions", FAILURE_NOTE_1X),
          ex("Romanian deadlifts", FAILURE_NOTE),
          ex("Hamstring curls", FAILURE_NOTE_1X),
          ex("Calf raises", FAILURE_NOTE),
        ],
      },
    ],
    restNote: "Saturday and Sunday are rest days.",
  },
  "7day": {
    id: "7day",
    label: "7 day gym plan",
    location: "gym",
    days: [
      {
        day: "Monday / Thursday",
        focus: "Chest, biceps, delts",
        exercises: [
          ex("Incline chest press", FAILURE_NOTE),
          ex("High to low cable flies", FAILURE_NOTE),
          ex("Cable lateral raises", FAILURE_NOTE, "or cable front raises — pick one"),
          ex("Cable curls", FAILURE_NOTE, "or dumbbell curls — pick one"),
        ],
      },
      {
        day: "Tuesday / Friday",
        focus: "Legs / abs",
        exercises: [
          ex("Leg press or squats", FAILURE_NOTE, "or leg extensions — pick one"),
          ex("Romanian deadlifts", FAILURE_NOTE, "or hamstring curls — pick one"),
          ex("Calf raises", FAILURE_NOTE),
          ex("Cable crunches", FAILURE_NOTE, "or hanging leg raises — pick one"),
        ],
      },
      {
        day: "Wednesday / Saturday",
        focus: "Back, rear delts, triceps",
        exercises: [
          ex("Lat pulldowns", FAILURE_NOTE, "or pullups — pick one"),
          ex("Wide grip rows", FAILURE_NOTE),
          ex("Cable rear delt flies", FAILURE_NOTE),
          ex("Tricep pushdowns", FAILURE_NOTE, "or skull crushers — pick one"),
        ],
      },
    ],
    restNote: "Thursday–Saturday repeat the Monday–Wednesday schedule. Sunday is a rest day.",
  },
};

export const HOME_PLANS: Record<string, WorkoutPlan> = {
  "3day": {
    id: "3day",
    label: "3 day home plan",
    location: "home",
    equipmentNote:
      "Needs: floor space and a sturdy chair or table. A resistance band is optional but unlocks the band variations.",
    days: [
      {
        day: "Monday",
        focus: "Chest, biceps, delts",
        exercises: [
          ex("Pike push-ups", FAILURE_NOTE, "or decline push-ups, feet elevated — pick one"),
          ex("Wide push-ups", FAILURE_NOTE, "or standing band flies — pick one"),
          ex("Band lateral raises", FAILURE_NOTE, "or band front raises — pick one"),
          ex("Band curls", FAILURE_NOTE, "or loaded-backpack curls — pick one"),
        ],
      },
      {
        day: "Wednesday",
        focus: "Legs / abs",
        exercises: [
          ex("Bodyweight squats", FAILURE_NOTE, "or Bulgarian split squats using a chair — pick one"),
          ex("Single-leg Romanian deadlifts", FAILURE_NOTE, "or band hamstring curls — pick one"),
          ex("Standing calf raises", FAILURE_NOTE),
          ex("Lying leg raises", FAILURE_NOTE, "or hanging leg raises if a bar is available — pick one"),
        ],
      },
      {
        day: "Friday",
        focus: "Back, rear delts, triceps",
        exercises: [
          ex("Pullups", FAILURE_NOTE, "or band pulldowns — pick one"),
          ex("Band rows", FAILURE_NOTE, "or towel rows under a sturdy table — pick one"),
          ex("Band rear delt flies", FAILURE_NOTE),
          ex("Diamond push-ups", FAILURE_NOTE, "or band pushdowns — pick one"),
        ],
      },
    ],
    restNote: "Tuesday, Thursday, Saturday, Sunday are rest days.",
  },
  "5day": {
    id: "5day",
    label: "5 day home plan",
    location: "home",
    equipmentNote:
      "Needs: floor space and a sturdy chair or table. A resistance band is optional but unlocks the band variations.",
    days: [
      {
        day: "Monday",
        focus: "Chest, biceps, delts",
        exercises: [
          ex("Pike push-ups", FAILURE_NOTE, "or decline push-ups, feet elevated — pick one"),
          ex("Wide push-ups", FAILURE_NOTE, "or standing band flies — pick one"),
          ex("Band lateral raises", FAILURE_NOTE, "or band front raises — pick one"),
          ex("Band curls", FAILURE_NOTE, "or loaded-backpack curls — pick one"),
        ],
      },
      {
        day: "Tuesday",
        focus: "Legs / abs",
        exercises: [
          ex("Bodyweight squats", FAILURE_NOTE, "or Bulgarian split squats using a chair — pick one"),
          ex("Single-leg Romanian deadlifts", FAILURE_NOTE, "or band hamstring curls — pick one"),
          ex("Standing calf raises", FAILURE_NOTE),
          ex("Lying leg raises", FAILURE_NOTE, "or hanging leg raises if a bar is available — pick one"),
        ],
      },
      {
        day: "Wednesday",
        focus: "Back, rear delts, triceps",
        exercises: [
          ex("Pullups", FAILURE_NOTE, "or band pulldowns — pick one"),
          ex("Band rows", FAILURE_NOTE, "or towel rows under a sturdy table — pick one"),
          ex("Band rear delt flies", FAILURE_NOTE),
          ex("Diamond push-ups", FAILURE_NOTE, "or band pushdowns — pick one"),
        ],
      },
      {
        day: "Thursday",
        focus: "Upper + abs",
        exercises: [
          ex("Push-ups", FAILURE_NOTE),
          ex("Pullups", FAILURE_NOTE, "or band pulldowns — pick one"),
          ex("Band curls", FAILURE_NOTE_1X, "or backpack curls — pick one"),
          ex("Diamond push-ups", FAILURE_NOTE_1X, "or band pushdowns — pick one"),
          ex("Band lateral raises", FAILURE_NOTE_1X),
          ex("Lying leg raises", FAILURE_NOTE_1X, "or hanging leg raises — pick one"),
        ],
      },
      {
        day: "Friday",
        focus: "Lower",
        exercises: [
          ex("Bodyweight squats", FAILURE_NOTE),
          ex("Bulgarian split squats", FAILURE_NOTE_1X),
          ex("Single-leg Romanian deadlifts", FAILURE_NOTE),
          ex("Band hamstring curls", FAILURE_NOTE_1X),
          ex("Standing calf raises", FAILURE_NOTE),
        ],
      },
    ],
    restNote: "Saturday and Sunday are rest days.",
  },
  "7day": {
    id: "7day",
    label: "7 day home plan",
    location: "home",
    equipmentNote:
      "Needs: floor space and a sturdy chair or table. A resistance band is optional but unlocks the band variations.",
    days: [
      {
        day: "Monday / Thursday",
        focus: "Chest, biceps, delts",
        exercises: [
          ex("Pike push-ups", FAILURE_NOTE, "or decline push-ups, feet elevated — pick one"),
          ex("Wide push-ups", FAILURE_NOTE, "or standing band flies — pick one"),
          ex("Band lateral raises", FAILURE_NOTE, "or band front raises — pick one"),
          ex("Band curls", FAILURE_NOTE, "or loaded-backpack curls — pick one"),
        ],
      },
      {
        day: "Tuesday / Friday",
        focus: "Legs / abs",
        exercises: [
          ex("Bodyweight squats", FAILURE_NOTE, "or Bulgarian split squats using a chair — pick one"),
          ex("Single-leg Romanian deadlifts", FAILURE_NOTE, "or band hamstring curls — pick one"),
          ex("Standing calf raises", FAILURE_NOTE),
          ex("Lying leg raises", FAILURE_NOTE, "or hanging leg raises if a bar is available — pick one"),
        ],
      },
      {
        day: "Wednesday / Saturday",
        focus: "Back, rear delts, triceps",
        exercises: [
          ex("Pullups", FAILURE_NOTE, "or band pulldowns — pick one"),
          ex("Band rows", FAILURE_NOTE, "or towel rows under a sturdy table — pick one"),
          ex("Band rear delt flies", FAILURE_NOTE),
          ex("Diamond push-ups", FAILURE_NOTE, "or band pushdowns — pick one"),
        ],
      },
    ],
    restNote: "Thursday–Saturday repeat the Monday–Wednesday schedule. Sunday is a rest day.",
  },
};

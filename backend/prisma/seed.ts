// 1. Pointing exactly to your custom generated client folder files
import { prisma } from "../src/prisma";
import { SessionType } from "../generated/prisma/enums";




async function main() {
  console.log('🌱 Starting 8-week Triathlon Training Program Seed...');

  // Clear database to start clean
  await prisma.sessionCompletion.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Leo and Klara
  const leo = await prisma.user.create({
    data: { name: 'Leo'},
  });

  const klara = await prisma.user.create({
    data: { name: 'Klara'},
  });

  // 2. This uses the variables so TypeScript stops complaining!
  console.log(`👥 Created users: ${leo.name} (ID: ${leo.id}) and ${klara.name} (ID: ${klara.id})`);

  // Define the 8-Week Plan Template
  const trainingPlan = [
    // --- PHASE 1: BASE WEEKS ---
    { week: 1, type: SessionType.swim, description: "Technique: 50m intervals focus on form", distance: 1000, unit: "m", day: "Tuesday" },
    { week: 1, type: SessionType.bike, description: "Easy spinning, steady cadence", distance: 20, unit: "km", day: "Thursday" },
    { week: 1, type: SessionType.run, description: "Zone 2 base aerobic run", distance: 5, unit: "km", day: "Saturday" },

    { week: 2, type: SessionType.swim, description: "Endurance builder: 200m blocks", distance: 1200, unit: "m", day: "Tuesday" },
    { week: 2, type: SessionType.bike, description: "Aerobic capacity ride with hill intervals", distance: 25, unit: "km", day: "Thursday" },
    { week: 2, type: SessionType.run, description: "Long slow distance run", distance: 7, unit: "km", day: "Saturday" },

    { week: 3, type: SessionType.swim, description: "Pacing intervals: 100m at race pace", distance: 1500, unit: "m", day: "Tuesday" },
    { week: 3, type: SessionType.bike, description: "Tempo ride on flat course", distance: 30, unit: "km", day: "Thursday" },
    { week: 3, type: SessionType.run, description: "Interval run: 4x1km fast, 1min rest", distance: 6, unit: "km", day: "Saturday" },

    // --- PHASE 2: BUILD & BRICK WEEKS ---
    { week: 4, type: SessionType.swim, description: "Open water simulation in pool: continuous swim", distance: 1500, unit: "m", day: "Tuesday" },
    { week: 4, type: SessionType.bike, description: "Brick Part 1: Hard sustained bike ride", distance: 35, unit: "km", day: "Thursday" },
    { week: 4, type: SessionType.run, description: "Brick Part 2: Quick transition run off the bike", distance: 3, unit: "km", day: "Thursday" },
    { week: 4, type: SessionType.run, description: "Endurance weekend run", distance: 8, unit: "km", day: "Saturday" },

    { week: 5, type: SessionType.swim, description: "Pyramid intervals: 100-200-300-200-100", distance: 1600, unit: "m", day: "Tuesday" },
    { week: 5, type: SessionType.bike, description: "Long endurance ride", distance: 45, unit: "km", day: "Thursday" },
    { week: 5, type: SessionType.run, description: "Tempo run: Hold race pace throughout", distance: 8, unit: "km", day: "Saturday" },

    { week: 6, type: SessionType.swim, description: "Peak Volume Swim: Steady pace endurance", distance: 2000, unit: "m", day: "Tuesday" },
    { week: 6, type: SessionType.bike, description: "Peak Brick Part 1: Race pace simulation", distance: 40, unit: "km", day: "Thursday" },
    { week: 6, type: SessionType.run, description: "Peak Brick Part 2: Heavy legs survival run", distance: 5, unit: "km", day: "Thursday" },
    { week: 6, type: SessionType.run, description: "Peak Long Run: Slow and steady", distance: 10, unit: "km", day: "Saturday" },

    // --- PHASE 3: TAPER & RACE ---
    { week: 7, type: SessionType.swim, description: "Taper Swim: Recovery and technique focus", distance: 1200, unit: "m", day: "Tuesday" },
    { week: 7, type: SessionType.bike, description: "Taper Bike: High cadence, low resistance", distance: 20, unit: "km", day: "Thursday" },
    { week: 7, type: SessionType.run, description: "Taper Run: Easy jog with 3x100m strides", distance: 5, unit: "km", day: "Saturday" },

    { week: 8, type: SessionType.swim, description: "Race Week Swim: Loosen up muscles", distance: 500, unit: "m", day: "Tuesday" },
    { week: 8, type: SessionType.bike, description: "Race Week Spin: Check bike mechanics", distance: 10, unit: "km", day: "Thursday" },
    { week: 8, type: SessionType.run, description: "🚀 TRIATHLON RACE DAY! Focus, pace, and enjoy!", distance: 0, unit: "Race", day: "Sunday" }
  ];

  // Seed Sessions to Database
  console.log(`Generating ${trainingPlan.length} training sessions...`);
  
  for (const sessionData of trainingPlan) {
    await prisma.session.create({
      data: {
        type: sessionData.type,
        description: `[W${sessionData.week}] ${sessionData.description}`,
        distance: sessionData.distance,
        unit: sessionData.unit,
        date: `${sessionData.day} (Week ${sessionData.week})`
      }
    });
  }

  console.log('✅ Success! 8-week progressive training plan injected cleanly.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
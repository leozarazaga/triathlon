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
    { week: 1, type: SessionType.SWIM, desc: "Technique: 50m intervals focus on form", dist: 1000, unit: "m", day: "Tuesday" },
    { week: 1, type: SessionType.BIKE, desc: "Easy spinning, steady cadence", dist: 20, unit: "km", day: "Thursday" },
    { week: 1, type: SessionType.RUN, desc: "Zone 2 base aerobic run", dist: 5, unit: "km", day: "Saturday" },

    { week: 2, type: SessionType.SWIM, desc: "Endurance builder: 200m blocks", dist: 1200, unit: "m", day: "Tuesday" },
    { week: 2, type: SessionType.BIKE, desc: "Aerobic capacity ride with hill intervals", dist: 25, unit: "km", day: "Thursday" },
    { week: 2, type: SessionType.RUN, desc: "Long slow distance run", dist: 7, unit: "km", day: "Saturday" },

    { week: 3, type: SessionType.SWIM, desc: "Pacing intervals: 100m at race pace", dist: 1500, unit: "m", day: "Tuesday" },
    { week: 3, type: SessionType.BIKE, desc: "Tempo ride on flat course", dist: 30, unit: "km", day: "Thursday" },
    { week: 3, type: SessionType.RUN, desc: "Interval run: 4x1km fast, 1min rest", dist: 6, unit: "km", day: "Saturday" },

    // --- PHASE 2: BUILD & BRICK WEEKS ---
    { week: 4, type: SessionType.SWIM, desc: "Open water simulation in pool: continuous swim", dist: 1500, unit: "m", day: "Tuesday" },
    { week: 4, type: SessionType.BIKE, desc: "Brick Part 1: Hard sustained bike ride", dist: 35, unit: "km", day: "Thursday" },
    { week: 4, type: SessionType.RUN, desc: "Brick Part 2: Quick transition run off the bike", dist: 3, unit: "km", day: "Thursday" },
    { week: 4, type: SessionType.RUN, desc: "Endurance weekend run", dist: 8, unit: "km", day: "Saturday" },

    { week: 5, type: SessionType.SWIM, desc: "Pyramid intervals: 100-200-300-200-100", dist: 1600, unit: "m", day: "Tuesday" },
    { week: 5, type: SessionType.BIKE, desc: "Long endurance ride", dist: 45, unit: "km", day: "Thursday" },
    { week: 5, type: SessionType.RUN, desc: "Tempo run: Hold race pace throughout", dist: 8, unit: "km", day: "Saturday" },

    { week: 6, type: SessionType.SWIM, desc: "Peak Volume Swim: Steady pace endurance", dist: 2000, unit: "m", day: "Tuesday" },
    { week: 6, type: SessionType.BIKE, desc: "Peak Brick Part 1: Race pace simulation", dist: 40, unit: "km", day: "Thursday" },
    { week: 6, type: SessionType.RUN, desc: "Peak Brick Part 2: Heavy legs survival run", dist: 5, unit: "km", day: "Thursday" },
    { week: 6, type: SessionType.RUN, desc: "Peak Long Run: Slow and steady", dist: 10, unit: "km", day: "Saturday" },

    // --- PHASE 3: TAPER & RACE ---
    { week: 7, type: SessionType.SWIM, desc: "Taper Swim: Recovery and technique focus", dist: 1200, unit: "m", day: "Tuesday" },
    { week: 7, type: SessionType.BIKE, desc: "Taper Bike: High cadence, low resistance", dist: 20, unit: "km", day: "Thursday" },
    { week: 7, type: SessionType.RUN, desc: "Taper Run: Easy jog with 3x100m strides", dist: 5, unit: "km", day: "Saturday" },

    { week: 8, type: SessionType.SWIM, desc: "Race Week Swim: Loosen up muscles", dist: 500, unit: "m", day: "Tuesday" },
    { week: 8, type: SessionType.BIKE, desc: "Race Week Spin: Check bike mechanics", dist: 10, unit: "km", day: "Thursday" },
    { week: 8, type: SessionType.RUN, desc: "🚀 TRIATHLON RACE DAY! Focus, pace, and enjoy!", dist: 0, unit: "Race", day: "Sunday" }
  ];

  // Seed Sessions to Database
  console.log(`Generating ${trainingPlan.length} training sessions...`);
  
  for (const sessionData of trainingPlan) {
    await prisma.session.create({
      data: {
        type: sessionData.type,
        description: `[W${sessionData.week}] ${sessionData.desc}`,
        distance: sessionData.dist,
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
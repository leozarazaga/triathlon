// 1. Pointing exactly to your custom generated client folder files
import { prisma } from "../src/prisma";
import { SessionType } from "../generated/prisma/enums";

async function main() {
    console.log("🌱 Starting 8-week Realistic Beginner Triathlon Training Program Seed...");

    // Clear database to start clean
    await prisma.sessionCompletion.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.user.deleteMany({});

    // Create Leo and Klara
    // --- UPDATE THIS SECTION IN YOUR SEED FILE ---

    // Create Leo with explicit ID 1
    const leo = await prisma.user.create({
        data: {
            id: 1,
            name: "Leo",
        },
    });

    // Create Klara with explicit ID 2
    const klara = await prisma.user.create({
        data: {
            id: 2,
            name: "Klara",
        },
    });

    console.log(`👥 Created users: ${leo.name} (ID: ${leo.id}) and ${klara.name} (ID: ${klara.id})`);

    // Define the Actionable 8-Week Progressive Beginner Plan
    const trainingPlan = [
        // --- WEEK 1: FOUNDATION & FEEL ---
        {
            week: 1,
            type: SessionType.swim,
            description: "Warmup: 200m. Main: 12x50m rest 20s (focus on high elbows). Cooldown: 200m.",
            distance: 1000,
            unit: "m",
        },
        {
            week: 1,
            type: SessionType.bike,
            description: "Flat, aerobic spin. Maintain a smooth, high cadence (85-90 RPM). Effort 5/10.",
            distance: 20,
            unit: "km",
        },
        {
            week: 1,
            type: SessionType.run,
            description: "Conversational base pace. Continuous easy running, focus on light, quick steps.",
            distance: 5,
            unit: "km",
        },

        // --- WEEK 2: BUILDING CAPACITY ---
        {
            week: 2,
            type: SessionType.swim,
            description: "Warmup: 200m. Main: 4x200m steady pace (rest 30s between blocks). Cooldown: 200m.",
            distance: 1200,
            unit: "m",
        },
        {
            week: 2,
            type: SessionType.bike,
            description: "Aerobic endurance. Include 3x2-minute hill climbs sitting down, building leg strength.",
            distance: 25,
            unit: "km",
        },
        {
            week: 2,
            type: SessionType.run,
            description: "Long slow distance run. Aerobic endurance building, pace should be very easy.",
            distance: 7,
            unit: "km",
        },

        // --- WEEK 3: PACING & INTERVALS ---
        {
            week: 3,
            type: SessionType.swim,
            description: "Warmup: 300m. Main: 10x100m at intended race pace (take 20s rest after each). Cooldown: 200m.",
            distance: 1500,
            unit: "m",
        },
        {
            week: 3,
            type: SessionType.bike,
            description: "Tempo endurance. 10km easy, 15km sustained hard effort, 5km spin down.",
            distance: 30,
            unit: "km",
        },
        {
            week: 3,
            type: SessionType.run,
            description: "Intervals: 1km warmup. 4x1km fast with 90s walking recovery. 1km cooldown.",
            distance: 6,
            unit: "km",
        },

        // --- WEEK 4: COGNITIVE BRICK TRANSITION ---
        {
            week: 4,
            type: SessionType.swim,
            description: "Open Water Prep: 400m continuous swim. 8x100m sighting every 4th stroke. Cooldown: 300m.",
            distance: 1500,
            unit: "m",
        },
        {
            week: 4,
            type: SessionType.bike,
            description: "Brick Set Part 1: Sustained steady ride. Last 5km prepare mind for transition.",
            distance: 35,
            unit: "km",
        },
        {
            week: 4,
            type: SessionType.run,
            description: "Brick Set Part 2: Quick change out of cycling gear. 3km run directly off the bike.",
            distance: 3,
            unit: "km",
        },
        {
            week: 4,
            type: SessionType.run,
            description: "Weekend base builder. Focus on a strong, consistent aerobic engine.",
            distance: 8,
            unit: "km",
        },

        // --- WEEK 5: STRENGTH PREP ---
        {
            week: 5,
            type: SessionType.swim,
            description: "Pyramid Swim: 100m-200m-300m-400m-300m-200m-100m with 30s rest between sets.",
            distance: 1600,
            unit: "m",
        },
        {
            week: 5,
            type: SessionType.bike,
            description: "Long structural ride. Get comfortable on the saddle for race-distance durations.",
            distance: 45,
            unit: "km",
        },
        {
            week: 5,
            type: SessionType.run,
            description: "Tempo Run: 2km easy. 4km holding target race pace. 2km cooldown jog.",
            distance: 8,
            unit: "km",
        },

        // --- WEEK 6: PEAK VOLUME WEEK ---
        {
            week: 6,
            type: SessionType.swim,
            description: "Peak Endurance: Continuous 1500m endurance block + 5x100m recovery lengths.",
            distance: 2000,
            unit: "m",
        },
        {
            week: 6,
            type: SessionType.bike,
            description: "Peak Brick Part 1: Race-simulation effort. Practice drinking nutrition on the bike.",
            distance: 40,
            unit: "km",
        },
        {
            week: 6,
            type: SessionType.run,
            description: "Peak Brick Part 2: Head straight out to run. Shake out heavy 'jelly legs' quickly.",
            distance: 5,
            unit: "km",
        },
        {
            week: 6,
            type: SessionType.run,
            description: "Maximum Distance Run: Slow, focused, continuous rhythm. No speed intervals.",
            distance: 10,
            unit: "km",
        },

        // --- WEEK 7: THE TAPER PHASE ---
        {
            week: 7,
            type: SessionType.swim,
            description: "Taper Swim: 200m warmup. 6x100m easy technique strokes. 4x50m fast. Cooldown: 200m.",
            distance: 1200,
            unit: "m",
        },
        {
            week: 7,
            type: SessionType.bike,
            description: "Recovery spin. High cadence (90+ RPM), very light gear resistance to protect knees.",
            distance: 20,
            unit: "km",
        },
        {
            week: 7,
            type: SessionType.run,
            description: "Taper Jog: 4km easy conversational pace + 3x100m strides at the finish.",
            distance: 5,
            unit: "km",
        },

        // --- WEEK 8: RACE WEEK STORED ENERGY ---
        {
            week: 8,
            type: SessionType.swim,
            description: "Muscular prep. Easy 100m blocks just to stay connected to the water feel.",
            distance: 500,
            unit: "m",
        },
        {
            week: 8,
            type: SessionType.bike,
            description: "Activation Spin: Keep legs awake. Test shifting gears and brake mechanics.",
            distance: 10,
            unit: "km",
        },
        {
            week: 8,
            type: SessionType.run,
            description: "🚀 TRIATHLON RACE DAY! Keep cool out of the water, pace the bike, fly home!",
            distance: 0,
            unit: "Race",
        },
    ];

    console.log(`Generating ${trainingPlan.length} training sessions...`);

    for (const sessionData of trainingPlan) {
        await prisma.session.create({
            data: {
                type: sessionData.type,
                description: `[W${sessionData.week}] ${sessionData.description}`,
                distance: sessionData.distance,
                unit: sessionData.unit,
                date: `Week ${sessionData.week}`, // Stripped out the day string to keep code structured and clean
            },
        });
    }

    console.log("✅ Success! 8-week progressive training plan injected cleanly.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

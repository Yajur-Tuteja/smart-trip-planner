import { db } from "./firebaseAdmin.js";

export async function createTrip(req, res) {
    try {
        const { userEmail, userSelection, tripData } = req.body;

        if (!userEmail || !userSelection || !tripData) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Missing required fields",
            });
        }

        const docRef = db.collection("AITrips").doc(); // generate ID

        await docRef.set({
            id: docRef.id,
            userEmail,
            userSelection,
            tripData,
            createdAt: new Date(),
        });


        res.json({
            success: true,
            data: { id: docRef.id },
            error: null,
        });

    } catch (error) {
        console.error("Create trip error:", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal server error",
        });
    }
}

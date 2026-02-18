import { db } from "./firebaseAdmin.js";

export async function createTrip(req, res) {
    try {
        const { userId, userSelection, tripData } = req.body;

        if (!userId || !userSelection || !tripData) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Missing required fields",
            });
        }

        db.collection("users")
            .doc(userId)
            .collection("trips")
            .add({
                tripData,
                createdAt: new Date()
            });


        res.json({
            success: true,
            data: { id: userId },
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

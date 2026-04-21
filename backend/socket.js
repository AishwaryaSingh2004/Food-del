/*import User from "./models/user.model.js"

export const socketHandler= (io) => {
    io.on(`connection`,(socket)=>{
        socket.on('identity', async ({userId})=>{
            try {
                const user=await User.findByIdAndUpdate(userId,{
                    socketId:socket.id,isOnline:true 
                },{new:true})
            } catch (error) {
                console.log(error);
            }
        })
    })
}
*/



/*
import User from "./models/user.model.js";

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("🔌 User connected:", socket.id);

        socket.on("identity", async ({ userId }) => {
            try {
                if (!userId) return;

                await User.findByIdAndUpdate(
                    userId,
                    {
                        socketId: socket.id,
                        isOnline: true
                    },
                    { returnDocument: "after" }
                );

            } catch (error) {
                console.log("❌ Error:", error);
            }
        });

        socket.on('updateLocation', async ({ latitude, longitude, userId }) => {
            try {
                const user = await User.findByIdAndUpdate(userId, {
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    isOnline: true,
                    socketId: socket.id
                });

                if (user) {
                    io.emit('updateDeliveryLocation', {
                        deliveryBoyId: userId,
                        latitude,
                        longitude
                    });
                }

            } catch (error) {
                console.log('updateDeliveryLocation error');
            }
        });

        // ✅ KEEP ONLY ONE DISCONNECT HANDLER
        socket.on("disconnect", async () => {
            try {
                await User.findOneAndUpdate(
                    { socketId: socket.id },
                    {
                        socketId: null,
                        isOnline: false
                    }
                );

                console.log("🔴 User disconnected:", socket.id);

            } catch (error) {
                console.log("❌ Disconnect error:", error);
            }
        });

    });
};*/



import User from "./models/user.model.js";

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("🔌 User connected:", socket.id);

        socket.on("identity", async ({ userId }) => {
            try {
                if (!userId) return;

                await User.findByIdAndUpdate(
                    userId,
                    {
                        socketId: socket.id,
                        isOnline: true
                    },
                    { returnDocument: "after" }
                );

            } catch (error) {
                console.log("❌ Error:", error);
            }
        });

        socket.on('updateLocation', async ({ latitude, longitude, userId }) => {
            try {
                if (!latitude || !longitude || !userId) return;

                const user = await User.findByIdAndUpdate(
                    userId,
                    {
                        location: {
                            type: 'Point',
                            coordinates: [
                                Number(longitude),  // ✅ FIX (important)
                                Number(latitude)    // ✅ FIX (important)
                            ]
                        },
                        isOnline: true,
                        socketId: socket.id
                    },
                    { new: true }
                );

                if (user) {
                    io.emit('updateDeliveryLocation', {
                        deliveryBoyId: userId,
                        latitude: Number(latitude),
                        longitude: Number(longitude)
                    });
                }

            } catch (error) {
                console.log('updateDeliveryLocation error:', error);
            }
        });

        socket.on("disconnect", async () => {
            try {
                await User.findOneAndUpdate(
                    { socketId: socket.id },
                    {
                        socketId: null,
                        isOnline: false
                    }
                );

                console.log("🔴 User disconnected:", socket.id);

            } catch (error) {
                console.log("❌ Disconnect error:", error);
            }
        });

    });
};
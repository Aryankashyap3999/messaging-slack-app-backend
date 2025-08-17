import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name of workspace is required"],
            unique: true
        },
        description: {
            type: String,
        },
        memebers: [
            {
                memeberId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                role: {
                    type: String,
                    enum: ['admin', 'memeber'],
                    default: 'memeber'
                }
            }
        ],
        joinCode: {
            type: String,
            required: [true, "Join code is required"]
        },
        channels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Channel'
            }
        ]
    }, { timestamps: true }
);

const Workspace = mongoose.model('Workspace', workspaceSchema);
export default Workspace;
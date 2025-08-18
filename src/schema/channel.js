import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Channel name is required"]
        }, 
        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace',
            required: [true, "Workspace id is required"]
        }
    }, { timestamps: true}
)

const Channel = mongoose.model('Channel', ChannelSchema);
export default Channel;
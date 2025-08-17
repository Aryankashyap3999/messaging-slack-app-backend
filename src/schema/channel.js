import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Channel name is required"]
        }
    }, { timestamps: true}
)

const Channel = mongoose.model('Channel', ChannelSchema);
export default Channel;
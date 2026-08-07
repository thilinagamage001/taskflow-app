import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'in-progress', 'completed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: '{VALUE} is not a valid priority',
      },
      default: 'medium',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    category: {
      type: String,
      enum: {
        values: ['work', 'personal', 'study', 'health', 'shopping', 'finance'],
        message: '{VALUE} is not a valid category',
      },
      default: 'personal',
    },
    tags: {
      type: [String],
      default: [],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, priority: 1 });
taskSchema.index({ userId: 1, dueDate: 1 });
taskSchema.index({ userId: 1, category: 1 });
taskSchema.index({ title: 'text', description: 'text' });

const Task = mongoose.model('Task', taskSchema);

export default Task;

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, uploadAvatar } from '../store/slices/authSlice';
import { addToast } from '../store/slices/uiSlice';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import api from '../services/api';
import { HiCamera, HiUser } from 'react-icons/hi2';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  const { register: regProfile, handleSubmit: handleProfile, formState: { errors: profileErrors } } = useForm({
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  });

  const { register: regPass, handleSubmit: handlePass, reset: resetPass, formState: { errors: passErrors } } = useForm();

  const onProfileSubmit = async (data) => {
    const result = await dispatch(updateProfile(data));
    if (updateProfile.fulfilled.match(result)) {
      dispatch(addToast({ type: 'success', message: 'Profile updated' }));
    } else {
      dispatch(addToast({ type: 'error', message: result.payload?.message || 'Update failed' }));
    }
  };

  const onPasswordSubmit = async (data) => {
    const result = await dispatch(updateProfile(data));
    // Use a different approach for password change
    try {
      await api.put('/users/password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      dispatch(addToast({ type: 'success', message: 'Password changed successfully' }));
      resetPass();
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err.response?.data?.message || 'Failed to change password' }));
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      dispatch(addToast({ type: 'error', message: 'Image must be less than 5MB' }));
      return;
    }
    const result = await dispatch(uploadAvatar(file));
    if (uploadAvatar.fulfilled.match(result)) {
      dispatch(addToast({ type: 'success', message: 'Avatar updated' }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-dark-100">Profile</h1>
        <p className="text-sm text-dark-500 mt-1">Manage your account settings</p>
      </div>

      <Card>
        <CardContent className="py-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="relative">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full object-cover" />
              ) : (
                <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                  <HiUser className="h-10 w-10 text-primary-600" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 p-1.5 bg-primary-600 text-white rounded-full cursor-pointer hover:bg-primary-700 shadow-sm">
                <HiCamera className="h-3.5 w-3.5" />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-dark-900 dark:text-dark-100">{user?.name}</h3>
              <p className="text-sm text-dark-500">{user?.email}</p>
            </div>
          </div>

          <div className="flex border-b border-dark-200 dark:border-dark-700 mb-6">
            {['profile', 'password'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-dark-500 hover:text-dark-700'
                }`}
              >
                {tab === 'profile' ? 'Profile Info' : 'Change Password'}
              </button>
            ))}
          </div>

          {activeTab === 'profile' && (
            <form onSubmit={handleProfile(onProfileSubmit)} className="space-y-4 max-w-md">
              <Input
                label="Full Name"
                error={profileErrors.name?.message}
                {...regProfile('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'At least 2 characters' },
                })}
              />
              <Input
                label="Email"
                type="email"
                error={profileErrors.email?.message}
                {...regProfile('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                })}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePass(onPasswordSubmit)} className="space-y-4 max-w-md">
              <Input
                label="Current Password"
                type="password"
                error={passErrors.currentPassword?.message}
                {...regPass('currentPassword', { required: 'Current password is required' })}
              />
              <Input
                label="New Password"
                type="password"
                error={passErrors.newPassword?.message}
                {...regPass('newPassword', {
                  required: 'New password is required',
                  minLength: { value: 6, message: 'At least 6 characters' },
                })}
              />
              <Input
                label="Confirm New Password"
                type="password"
                error={passErrors.confirmPassword?.message}
                {...regPass('confirmPassword', {
                  required: 'Please confirm',
                  validate: (v, form) => v === form.newPassword || 'Passwords do not match',
                })}
              />
              <Button type="submit">Change Password</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

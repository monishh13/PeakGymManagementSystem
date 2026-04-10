// utils/api.js - API utility functions

// Use environment variable or default to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';



const getAuthHeaders = () => {

    const token = localStorage.getItem('token');

    return {

        'Content-Type': 'application/json',

        ...(token && { 'Authorization': `Bearer ${token}` })

    };

};



const handleResponse = async (response) => {
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            window.location.href = '/login';
            throw new Error('Session expired. Please login again.');
        }

        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error || error.message || 'Request failed');
    }
    return response.json();
};



    export const api = {

        // Authentication

        login: async (credentials) => {

            const response = await fetch(`${API_BASE_URL}/auth/login`, {

                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({
                    email:credentials.email,
                    password:credentials.password
                })

            });

            return handleResponse(response);

        },



        // Users

        getUsers: async (page = 0, size = 10) => {
            const response = await fetch(`${API_BASE_URL}/users?page=${page}&size=${size}`, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        },



        getUser: async (userId) => {

            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {

                headers: getAuthHeaders()

            });

            return handleResponse(response);

        },



        createUser: async (userData) => {

            const response = await fetch(`${API_BASE_URL}/users`, {

                method: 'POST',

                headers: getAuthHeaders(),

                body: JSON.stringify(userData)

            });

            return handleResponse(response);

        },



        updateUser: async (userId, userData) => {

            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {

                method: 'PUT',

                headers: getAuthHeaders(),

                body: JSON.stringify(userData)

            });

            return handleResponse(response);

        },



        deleteUser: async (userId) => {

            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {

                method: 'DELETE',

                headers: getAuthHeaders()

            });

            return handleResponse(response);

        },



        // Workout Plans

        getWorkoutPlans: async (page = 0, size = 10) => {
            const response = await fetch(`${API_BASE_URL}/api/workout-plans?page=${page}&size=${size}`, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        },



            getWorkoutPlan: async (planId) => {

                const response = await fetch(`${API_BASE_URL}/api/workout-plans/${planId}`, {

                    headers: getAuthHeaders()

                });

                return handleResponse(response);

            },



            createWorkoutPlan: async (planData) => {

                const response = await fetch(`${API_BASE_URL}/api/workout-plans`, {

                    method: 'POST',

                    headers: getAuthHeaders(),

                    body: JSON.stringify(planData)

                });

                return handleResponse(response);

            },



            updateWorkoutPlan: async (planId, planData) => {

                const response = await fetch(`${API_BASE_URL}/api/workout-plans/${planId}`, {

                    method: 'PUT',

                    headers: getAuthHeaders(),

                    body: JSON.stringify(planData)

                    });

                    return handleResponse(response);

                },



                deleteWorkoutPlan: async (planId) => {

                    const response = await fetch(`${API_BASE_URL}/api/workout-plans/${planId}`, {

                        method: 'DELETE',

                        headers: getAuthHeaders()

                    });

                    return handleResponse(response);

                },



                // Exercises

                getExercises: async (planId) => {

                    const response = await fetch(`${API_BASE_URL}/api/workout-plans/${planId}/exercises`, {

                        headers: getAuthHeaders()

                    });

                    return handleResponse(response);

                },



                getAllExercises: async () => {

                    const response = await fetch(`${API_BASE_URL}/exercises`, {

                        headers: getAuthHeaders()

                    });

                    return handleResponse(response);

                    },



                    createExercise: async (exerciseData) => {

                        const response = await fetch(`${API_BASE_URL}/exercises`, {

                            method: 'POST',

                            headers: getAuthHeaders(),

                            body: JSON.stringify(exerciseData)

                        });

                        return handleResponse(response);

                    },



                    // Progress Tracking

                    getUserProgress: async (userId) => {

                        const response = await fetch(`${API_BASE_URL}/progress/${userId}`, {

                            headers: getAuthHeaders()

                        });

                        return handleResponse(response);

                    },



                    updateUserProgress: async (progressId, progressData) => {

                        const response = await fetch(`${API_BASE_URL}/progress/${progressId}`, {

                            method: 'PUT',

                            headers: getAuthHeaders(),

                            body: JSON.stringify(progressData)

                        });

                        return handleResponse(response);

                        },



                        logProgress: async (progressData) => {

                            const response = await fetch(`${API_BASE_URL}/progress`, {

                                method: 'POST',

                                headers: getAuthHeaders(),

                                body: JSON.stringify(progressData)

                            });

                            return handleResponse(response);

                        },



                        // Client specific APIs

                        getMyWorkoutPlan: async () => {

                            const response = await fetch(`${API_BASE_URL}/clients/my-plan`, {

                                headers: getAuthHeaders()

                            });

                            return handleResponse(response);

                        },



                        getMyProgress: async () => {

                            const response = await fetch(`${API_BASE_URL}/clients/my-progress`, {

                                headers: getAuthHeaders()

                            });

                            return handleResponse(response);

                        },



                        // Trainer specific APIs

                        getMyClients: async () => {

                            const response = await fetch(`${API_BASE_URL}/trainers/my-clients`, {

                                headers: getAuthHeaders()

                            });

                            return handleResponse(response);

                        },



                        assignPlanToClient: async (planId, clientId) => {

                            const response = await fetch(`${API_BASE_URL}/trainers/assign-plan`, {

                                method: 'POST',

                                headers: getAuthHeaders(),

                                body: JSON.stringify({ planId, clientId })

                            });

                            return handleResponse(response);

                        }

                    };
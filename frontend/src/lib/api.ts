import axios, { AxiosInstance, AxiosError } from "axios";
import { ApiResponse, PaginatedResponse } from "@/types/employee";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/backend";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : error.message;
    console.error("API Error:", errorMessage);
    return Promise.reject(error);
  }
);

// Employee API endpoints

export const employeeApi = {
  // GET all employees with pagination
  getAll: async (page: number = 0, size: number = 10, search?: string) => {
    const params = { page, size };
    if (search) {
      Object.assign(params, { search });
    }
    return apiClient.get<ApiResponse<PaginatedResponse<any>>>("/employees", { params });
  },

  // GET single employee by ID
  getById: async (id: string) => {
    return apiClient.get<ApiResponse<any>>(`/employees/${id}`);
  },

  // CREATE new employee
  create: async (data: any) => {
    return apiClient.post<ApiResponse<any>>("/employees", data);
  },

  // UPDATE employee
  update: async (id: string, data: any) => {
    return apiClient.put<ApiResponse<any>>(`/employees/${id}`, data);
  },

  // DELETE employee
  delete: async (id: string) => {
    return apiClient.delete<ApiResponse<any>>(`/employees/${id}`);
  },

  // Nested resource endpoints for related data

  // Personal Details
  getPersonalDetails: async (employeeId: string) => {
    return apiClient.get<ApiResponse<any>>(`/employees/${employeeId}/personal-details`);
  },

  updatePersonalDetails: async (employeeId: string, data: any) => {
    return apiClient.put<ApiResponse<any>>(`/employees/${employeeId}/personal-details`, data);
  },

  // Addresses
  getAddresses: async (employeeId: string) => {
    return apiClient.get<ApiResponse<any[]>>(`/employees/${employeeId}/addresses`);
  },

  addAddress: async (employeeId: string, data: any) => {
    return apiClient.post<ApiResponse<any>>(`/employees/${employeeId}/addresses`, data);
  },

  updateAddress: async (employeeId: string, addressId: string, data: any) => {
    return apiClient.put<ApiResponse<any>>(`/employees/${employeeId}/addresses/${addressId}`, data);
  },

  deleteAddress: async (employeeId: string, addressId: string) => {
    return apiClient.delete<ApiResponse<any>>(`/employees/${employeeId}/addresses/${addressId}`);
  },

  // Education
  getEducation: async (employeeId: string) => {
    return apiClient.get<ApiResponse<any[]>>(`/employees/${employeeId}/education`);
  },

  addEducation: async (employeeId: string, data: any) => {
    return apiClient.post<ApiResponse<any>>(`/employees/${employeeId}/education`, data);
  },

  updateEducation: async (employeeId: string, educationId: string, data: any) => {
    return apiClient.put<ApiResponse<any>>(`/employees/${employeeId}/education/${educationId}`, data);
  },

  deleteEducation: async (employeeId: string, educationId: string) => {
    return apiClient.delete<ApiResponse<any>>(`/employees/${employeeId}/education/${educationId}`);
  },

  // Employment
  getEmployment: async (employeeId: string) => {
    return apiClient.get<ApiResponse<any[]>>(`/employees/${employeeId}/employment`);
  },

  addEmployment: async (employeeId: string, data: any) => {
    return apiClient.post<ApiResponse<any>>(`/employees/${employeeId}/employment`, data);
  },

  updateEmployment: async (employeeId: string, employmentId: string, data: any) => {
    return apiClient.put<ApiResponse<any>>(`/employees/${employeeId}/employment/${employmentId}`, data);
  },

  deleteEmployment: async (employeeId: string, employmentId: string) => {
    return apiClient.delete<ApiResponse<any>>(`/employees/${employeeId}/employment/${employmentId}`);
  },

  // Family
  getFamily: async (employeeId: string) => {
    return apiClient.get<ApiResponse<any[]>>(`/employees/${employeeId}/family`);
  },

  addFamilyMember: async (employeeId: string, data: any) => {
    return apiClient.post<ApiResponse<any>>(`/employees/${employeeId}/family`, data);
  },

  updateFamilyMember: async (employeeId: string, memberId: string, data: any) => {
    return apiClient.put<ApiResponse<any>>(`/employees/${employeeId}/family/${memberId}`, data);
  },

  deleteFamilyMember: async (employeeId: string, memberId: string) => {
    return apiClient.delete<ApiResponse<any>>(`/employees/${employeeId}/family/${memberId}`);
  },

  // Bank Details
  getBankDetails: async (employeeId: string) => {
    return apiClient.get<ApiResponse<any>>(`/employees/${employeeId}/bank-details`);
  },

  updateBankDetails: async (employeeId: string, data: any) => {
    return apiClient.put<ApiResponse<any>>(`/employees/${employeeId}/bank-details`, data);
  },

  // PF Details
  getPFDetails: async (employeeId: string) => {
    return apiClient.get<ApiResponse<any>>(`/employees/${employeeId}/pf-details`);
  },

  updatePFDetails: async (employeeId: string, data: any) => {
    return apiClient.put<ApiResponse<any>>(`/employees/${employeeId}/pf-details`, data);
  },

  // Documents
  getDocuments: async (employeeId: string) => {
    return apiClient.get<ApiResponse<any[]>>(`/employees/${employeeId}/documents`);
  },

  uploadDocument: async (employeeId: string, data: FormData) => {
    return apiClient.post<ApiResponse<any>>(`/employees/${employeeId}/documents`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteDocument: async (employeeId: string, documentId: string) => {
    return apiClient.delete<ApiResponse<any>>(`/employees/${employeeId}/documents/${documentId}`);
  },

  // Assets
  getAssets: async (employeeId: string) => {
    return apiClient.get<ApiResponse<any[]>>(`/employees/${employeeId}/assets`);
  },

  addAsset: async (employeeId: string, data: any) => {
    return apiClient.post<ApiResponse<any>>(`/employees/${employeeId}/assets`, data);
  },

  updateAsset: async (employeeId: string, assetId: string, data: any) => {
    return apiClient.put<ApiResponse<any>>(`/employees/${employeeId}/assets/${assetId}`, data);
  },

  deleteAsset: async (employeeId: string, assetId: string) => {
    return apiClient.delete<ApiResponse<any>>(`/employees/${employeeId}/assets/${assetId}`);
  },
};

export default apiClient;

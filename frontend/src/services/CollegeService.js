import http from "../http-common";

//  Get all colleges given a specific userId
const getAll = (userId) => {
  return http.get(`/colleges/${userId}`);
};

const get = (id) => {
  return http.get(`/colleges/${id}`);
};

const create = (data) => {
  return http.post("/colleges", data);
};

// Update a specific saved college by userId AND collegeId (this one is working)
const update = (userId, collegeId, data) => {
  return http.put(`/colleges/${userId}/${collegeId}`, data);
};

// Delete college from favorites list (this one is working)
const remove = (userId, collegeId) => {
  return http.delete(`/colleges/${userId}/${collegeId}`);
};

// const removeAll = () => {
//   return http.delete(`/colleges`);
// };

const CollegeService = {
  getAll,
  get,
  create,
  update,
  remove,
  // removeAll,
};

export default CollegeService;

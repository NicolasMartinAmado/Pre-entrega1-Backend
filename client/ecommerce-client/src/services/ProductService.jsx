import ApiService from "./CustomService.jsx";

export default class ServiceProducts extends ApiService {
  constructor (uriBase, token) {
    super(uriBase, 'api/products/', token)
  }
}
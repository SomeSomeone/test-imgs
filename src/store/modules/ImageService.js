import axios from "axios";
import config from "@/store/modules/config";

const ImageService = {
  getList(params) {
    return axios.get(`${config.apiUrl}/images`, { params }).then(answer => {
      return { list: answer.data.pictures, pageCount: answer.data.pageCount };
    });
  },
  getItem(params) {
    let { id, ...paramsWithOutId } = params;
    return axios
      .get(`${config.apiUrl}/images/${id}`, { params: paramsWithOutId })
      .then(answer => {
        debugger;
        return answer.data;
      });
  }
};

export default ImageService;

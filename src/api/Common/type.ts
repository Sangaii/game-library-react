export interface gameListItem {
 id: String;
 name: String;
 img: String;
 desp: String;
}

export interface IResponse {
 status: String;
 data: Array<gameListItem>;
 msg: String;
}
/**用户登录 */
export interface SingleParam {
 dictName: String;
}

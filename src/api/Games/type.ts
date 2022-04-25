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
export interface ILogin {
 /** 账户名称 */
 username: string;
 /** 账户密码 */
 password: string;
}

/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

export class UserModel {
	constructor(
		public _id: string,
		public name: string,
		public gender: string,
		public country: string
	) {}
}
import { ApolloLink, Observable } from "@apollo/client";

class CustomLink extends ApolloLink {
  // constructor() {
  //   super();
  // }
  request(operation) {
    console.log("yeah", operation);
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next([1, 2, 3, 4]);
        observer.complete();
      }, 2000);
    });
  }
}

export default CustomLink;

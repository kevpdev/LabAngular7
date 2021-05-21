import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { Comment } from 'src/app/shared/models/comment';
import { Critere } from 'src/app/shared/models/critere';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  businessesResultSearch: Business[] = [];
  businessesSubject = new Subject<Business[]>();

  constructor(@Inject(LOCALE_ID) private locale: string, private db: AngularFirestore) { }

  users = this.db.collection('users').ref;
  business: Business;
  businessSubject = new Subject<Business>();
  cumulRating = 0;

  getBusinessByCriteria(critere: Critere) {
    this.reset();

    let cityArray = critere.city ? critere.city.split(" ") : [];

    console.log(cityArray, critere);

    return this.users.get()
      .then(querySnapshot => {
        querySnapshot.forEach(docUser => {

          let querySector = docUser.ref.collection('businesses').where("sector", "==", critere.sector);
          let queryJob = querySector;
          if (critere.job) {
           queryJob = querySector.where("job", "==", critere.job);
          }

          let queryCity = queryJob.where("address.zipCode", "==", cityArray[0]).where("address.city", "==", cityArray[1]);
          
          queryCity.onSnapshot(querySnapshot2 => {
            querySnapshot2.forEach(docBusiness => {

              this.getFieldsAndCommentBusinessByCriteria(docBusiness);

            });
          });
        });
      });

  }

  emitBusinessByCriteria() {
    console.log(this.businessesResultSearch);
    this.businessesSubject.next(this.businessesResultSearch);
  }


  reset() {
    this.businessesResultSearch = [];
    this.businessesSubject.next(this.businessesResultSearch);
  }

  getBusinessById(index: string) {
    return this.users.get().then(querySnapshot => {
      querySnapshot.forEach(docUsers => {
        docUsers.ref.collection('businesses').doc(index).get()
          .then(docBusiness => {
            if (docBusiness.exists) {

              // get collections
              this.getCommentBusiness(docBusiness);

            }
          });
      });
    });
  }

  emitBusinessById() {
    console.log(this.business);
    this.businessSubject.next(this.business);
  }

  addCommentBusiness(comment: Comment, businessId: string) {
    return this.users.get().then(querySnapShot => {
      querySnapShot.forEach(docUsers => {
        docUsers.ref.collection('businesses').doc(businessId).get()
          .then(docBusiness => {
            if (docBusiness.exists) {
              const docBusinessRefComment = docBusiness.ref.collection('comments');
              docBusinessRefComment.doc(this.db.createId()).set(Object.assign({}, comment));

              //get  comment collection
              this.getCommentBusiness(docBusiness);

              //get comment Fields 
              this.business = docBusiness.data() as Business;
            }
          })
      })
    })
  }


  getCommentBusiness(docBusiness: DocumentData) {

    const docRefComment = docBusiness.ref.collection('comments');

    this.cumulRating = 0;

    docRefComment.get()
      .then(querySnapShot => {

        this.business = docBusiness.data() as Business;

        if (!this.business.comments) {
          this.business.comments = [];
        }

        querySnapShot.forEach(docComment => {

          let commentData = docComment.data() as Comment;

          this.cumulRating += commentData.rate;
          this.business.comments.push(commentData);
        });

        if (this.business.comments.length > 0) {
          this.business.comments.sort((a, b) => {
            if (new Date(a.date) < new Date(b.date)) {
              return 1;
            } else {
              return -1;
            }
          });
        }

        let commentsLength = this.business.comments.length;

        //Calcul star
        if (commentsLength > 0) {
          let nbStar = this.cumulRating / commentsLength;
          this.business.nbStar = Number(nbStar.toPrecision(2));
        }
        this.emitBusinessById();
      });
  }


  getFieldsAndCommentBusinessByCriteria(docBusiness: DocumentData) {

    // get collections
    docBusiness.ref.collection('comments').get()
      .then(querySnapshot => {

        this.cumulRating = 0;
        this.business = docBusiness.data() as Business;

        if (!this.business.comments) {
          this.business.comments = [];
        }

        querySnapshot.forEach(docComment => {

          let commentData = docComment.data() as Comment;
          this.cumulRating += commentData.rate;
          this.business.comments.push(docComment.data() as Comment);
        });

        if (this.business.comments.length > 0) {
          this.business.comments.sort((a, b) => {
            if (new Date(a.date) < new Date(b.date)) {
              return 1;
            } else {
              return -1;
            }
          });
        }

        let commentsLength = this.business.comments.length;

        //Calcul star
        if (commentsLength > 0) {
          let nbStar = this.cumulRating / commentsLength;
          this.business.nbStar = Number(nbStar.toPrecision(2));
        }

        this.businessesResultSearch.push(this.business);
        this.emitBusinessByCriteria();

      });
  }
}

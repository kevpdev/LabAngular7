import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { Console } from 'console';
import { Subject } from 'rxjs';
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

  getBusinessByCritere(critere: Critere){
    this.reset();

   let cityArray = critere.city.split(" ");

   console.log(cityArray);

   return this.users.get()
   .then(querySnapshot => {
    querySnapshot.forEach(docUser => {

      let sectorQuery = docUser.ref.collection('businesses').where("sector", "==", critere.sector);
      let jobQuery = sectorQuery;     

      if(critere.job){
        jobQuery = sectorQuery.where("job", "==", critere.job);
      }
      let cityQuery = jobQuery.where("adress.zipCode", "==", cityArray[0]).where("adress.city", "==", cityArray[1]);

      cityQuery.onSnapshot(querySnapshot2=>{
        querySnapshot2.forEach(docBusiness => {

          this.getCommentBusinessByCritère(docBusiness);

        });
      });
    });

    this.emitBusinessByCritere();

   })
   .catch(error => {
     console.log("Error getting documents: ", error);
    });
    
  }

  emitBusinessByCritere(){
    console.log(this.businessesResultSearch);
    this.businessesSubject.next(this.businessesResultSearch);
  }


  reset(){
    this.businessesResultSearch = [];
  }

  getBusinessById(index: string){
    console.log(index);
    return this.users.get().then(querySnapshot => {
      querySnapshot.forEach(docUsers =>{
        docUsers.ref.collection('businesses').doc(index).get()
        .then(docBusiness => {
          console.log(docBusiness.data());
          if(docBusiness.exists){
            
            // get fieds
            this.business = docBusiness.data() as Business;

            // get collections
            const docBusinessRefComment = docBusiness.ref.collection('comments');
            this.getCommentBusiness(docBusinessRefComment);
          
   

            console.log(this.business);
            this.emitBusinessById();
          }
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
         });;
      });
    });
  }

  emitBusinessById(){
    console.log(this.business);
    this.businessSubject.next(this.business);
  }

  addCommentBusiness(comment: Comment, businessId: string ){
    return this.users.get().then(querySnapShot => {
      querySnapShot.forEach(docUsers => {
        docUsers.ref.collection('businesses').doc(businessId).get()
        .then(docBusiness => {
          if(docBusiness.exists){
            const docBusinessRefComment = docBusiness.ref.collection('comments');
            docBusinessRefComment.doc(this.db.createId()).set(Object.assign({}, comment));
            
            //get  comment collection
            this.getCommentBusiness(docBusinessRefComment);
            
            
            //get comment Fields 
            this.business = docBusiness.data() as Business;
            

            //emit business after upate
            console.log(this.business);
            this.businessSubject.next(this.business);
          }
        })
      })
    })
  }


  getCommentBusiness(docRefComment: DocumentData){
    
    this.cumulRating = 0;

    docRefComment.get()
    .then(querySnapShot =>{

      if(!this.business.comments){
        this.business.comments = [];
      }

      querySnapShot.forEach(docComment =>{


        let commentData = docComment.data() as Comment;
        this.cumulRating +=  commentData.rate;
        this.business.comments.push(commentData);
      });

      if(this.business.comments.length > 0){
        this.business.comments.sort((a, b) =>{
          if(new Date(a.date) > new Date(b.date)){
            return 1;
          }else{
            return -1;
          }
        });
      }

      let commentsLength = this.business.comments.length;
      console.log(commentsLength);
                //Calcul star
      
      let nbStar = this.cumulRating / commentsLength;
      this.business.nbStar = Number(nbStar.toPrecision(2));
      console.log(commentsLength);   

    });

  }


  getCommentBusinessByCritère(docBusiness: DocumentData){
    
    this.cumulRating = 0;

            //get fields Business
            let businessData =  docBusiness.data() as Business;

            // get collections
            docBusiness.ref.collection('comments').get()
            .then(querySnapshot =>{
                if(!businessData.comments){
                  businessData.comments = [];
                }
    
                querySnapshot.forEach(docComment =>{
                  let commentData = docComment.data() as Comment;
                  this.cumulRating +=  commentData.rate;
                  businessData.comments.push(docComment.data() as Comment);
                });

                if(businessData.comments.length > 0){
                 businessData.comments.sort((a, b) =>{
                    if(new Date(a.date) > new Date(b.date)){
                      return 1;
                    }else{
                      return -1;
                    }
                  });
                }
                     
                let commentsLength = businessData.comments.length;
                console.log(commentsLength);
                          //Calcul star
                if(commentsLength > 0){
                let nbStar = this.cumulRating / commentsLength;
                businessData.nbStar = Number(nbStar.toPrecision(2));
                console.log(commentsLength); 
                }

                
                this.businessesResultSearch.push(businessData);
                console.log(this.businessesResultSearch);
            });
            

      

  }
}

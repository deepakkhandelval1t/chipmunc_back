var dateFormat = require('dateformat');
var encryt_decrypt = require('../services/encryt_decrypt.service')
var config = require('../configs/config').config();
const crypto = require("crypto");
registerUser = (req, next) => {
   saveUser(req, (err, user) => {
        if (err) {
          next({log_err: err.log_err, user_msg: err.user_msg}, null);
        }
        else {
          next(null, user);
        }
    })
  };
  getData = (req  , next ) => {
     req.models.users.find({id: req.user.id}, (err, userinformation) => {
      if(err){
        next(null, err);
      }
     else
     {
       req.models.user_educations.find({user_id: req.user.id}, (err, user_educations) => {
        if(err){
          next(null, err);
        }
          else
          {
              next(null,  { userinformation , user_educations });
          }
        })
       
      
     }
  })
  }

saveUser = (req, next) => {
    var userData = req.body;
    req.models.users.find({ email : userData.email, is_deleted: 0 }, (err, users) => {
        if (users && users.length > 0) {
            next({log_err: 'User with same email already exists', user_msg: 'User with same email already exists'}, null);
        } else {
            var passHash = encryt_decrypt.cryptoHash(userData.password);
            req.models.users.create([
                {
                    role_id: 1,
                    email: userData.email,
                    verificationtoken : userData.verificationtoken,
                    password: passHash,
                    status: '1',
                    created_by: 0,
                    confirm: false,
                    modified_by: 0,
                    created_at: new Date(),
                    modified_at: new Date()
                }], (err, user) => {
                    if (err) {
                      next({log_err: err, user_msg: 'Unknown Error, Contact Support'}, null);
                    }
                    else {
                      next(null, {id: user[0].id, email: user[0].email, role: user.role});
                    }
                   });
        }
      });
    }
getQuestion = (next)=>{
    globalQuestions.find().all().run((err, questions)=>{
      if (err) {
        next(err, null);
      }
      else {
        
          shuffle(questions, function(err,question){
            if (err) {
              next(err, null);
          }
          else {
            
               globalOptions.find({'id':question.id}, function(err,options){
              if(err){
                next(err, null);
              }
              else{
                var obj={'question':question, 'options':options};
                next(null, obj);
              }
          })
          }
        })
      }
    });
 }
  createUserAndSocialId = (req,token, refreshToken, profile, next) => {

    var tokenToConfirm = crypto.randomBytes(16).toString("hex");
    var userSharingCode = crypto.randomBytes(10).toString("hex");
    var isUserConfirmed = true;
    var defaultRole = config.database.defaultRole;
    req.models.users.create([
    {
          role_id: '1',
        email: profile.emails[0].value,
        password: "",
       status: '1',
        created_by: 0,
        modified_by: 0,
          created_at: new Date(),
         modified_at: new Date(),
         confirm: 'true',

}],function (err, user) {
     if(err)
        {
            next(err, null);
        } 
        else{
            if(profile.gender == "Male")
            profile.gender = 1;
            else{
                  if(profile.gender == "Female")
                   profile.gender = 2;
                   else
                      {
                        if(profile.gender == "other")
                         profile.gender = 3;
                        else
                         profile.gender = 4;
                      }
                 }
             req.models.user_details.create([
                              {   user_id: user[0].id,
                                  profile_heading: "",
                                  first_name: profile.name.givenName,
                                  middle_name: "",
                                  last_name:  profile.name.familyName,
                                  profile_picture: "",
                                  current_address: "",
                                  permanent_address:"",
                                  gender:profile.gender,
                                  is_mobile_phone_verified:'0', 
                                  marital_status: '1',
                                  passport_number:"",  
                                  dob : "" ,
                                  linkedin: "",
                                  github: "", 
                                  stackoverflow: "",
                                  current_package: 0.0, 
                                  resume:"",
                                  created_by: user[0].id,
                                  created_at:  new Date(),
                                  modified_by: user[0].id,
                                  modified_at: new Date(),

                           }], (err, userdetails) => {
                             if (err) {
                                  next({log_err: err, user_msg: 'Unknown Error, Contact Support'}, null);
                                     }
                             else {
                                 createSocialId(req ,token, refreshToken, user, profile, function(err, data){
                                 err?next(err, null):next(null, data);
                                 })
                                    } 
                                      }
                           );
              
         }
       
    });
}
createSocialId = function(req, token, refreshToken, user, profile, next){
    req.models.sociallogin.create([
        {
            social_name: profile.provider , 
            user_id: user[0].id,
            token: token,
             created_by: user[0].id,
             created_at:  new Date(),
             modified_by: user[0].id,
             modified_at: new Date(),
        }],function (err, items) {
            if(err){
                next(err, null);
            }
            else
                next(null, {id: user[0].id, email: user[0].email , name  : profile.name.givenName + " " +  profile.name.familyName    }); //if authentication unsuccessful, return error 
        });
}
saveUserProfile = (req,next)=>{
   var date = new Date();
   req.body.dob = dateFormat(date,"yyyy-mm-dd");
   req.models.user_details.find({user_id: req.user.id},function (err, userdetails) {
    if (err) {
      next(err, null)
    }
    else if(userdetails && userdetails.length > 0){
      userdetails[0].save({
          profile_heading: req.body.profile_heading,
          first_name: req.body.first_name,
          middle_name: req.body.middle_name,
          last_name: req.body.last_name,
          current_address: req.body.current_address,
          permanent_address: req.body.permanent_address,
          gender: req.body.gender,
          pincode: req.body.pincode,
          office_phone: req.body.office_phone,
          mobile_phone: req.body.mobile_phone,
          home_phone: req.body.home_phone,
          marital_status: req.body.marital_status,
          passport_number: req.body.passport_number,
          dob: req.body.dob,
          current_package: req.body.current_package,
          website: req.body.website,
          email:req.body.email,
          country: req.body.country,
          state: req.body.state,
          city: req.body.city,
          facebook: req.body.facebook,
          github: req.body.github,
          linkedin: req.body.linkedin,
          stackoverflow: req.body.stackoverflow,
          created_by: req.user.id,
          modified_by: req.user.id,
          modified_at: new Date()
      },(err,data)=>{
        if(err)
          next(err, null)
        else
          next(null,data)
      })
    }
  });
  req.models.users.find({id: req.user.id},function (err, users) {
    if (err) {
      next(err, null)
    }
    else{
      users[0].save({
          email:req.body.email
      }, (err, data)=>{
          if (err) {
            next(err,null);
           }
          else {    
            next(null,data);
          }           
         })
    }
  });
}

getUserProfile = (req,next) =>{
    req.models.users.find({'id' :req.user.id},function(err,details){
      if(err){
        next(err,null);
      }
      else{
        req.models.user_details.find({'user_id' :req.user.id},function(err,data){
          if(err){
            next(err,null);
          }
          else{
          var obj = {'user_details': data[0], 'users': details[0]}
          next(null , obj);
          }
        })
      }
   });
}

saveUserCertificates = (req,next)=>{
     req.models.user_certifications.create([
       { user_id: req.user.id,
         name: req.body.name,
         completed_month: req.body.completed_month,
         completed_year: req.body.completed_year,
         description: req.body.description,
         created_by: req.user.id,
         modified_by: req.user.id,
         modified_at: new Date() }
        ], function(err,data){ 
       if(err)
         next(err, null)
       else
         next(null,data)
     })
  }

getUserCertificates = (req,next) => {
  req.models.users.find({'id' :req.user.id},function(err, user){
    if(err){
      next(err,null);
    }
    else{
      req.models.user_certifications.find({'user_id' :req.user.id},function(err,data){
        if(err){
          next(err,null);
        }
        else{
        var obj = {'user_certifications': data[0], 'users': user[0]}
        next(null , obj);
        }
      })
    }
 });
}

saveUserEducation = (req,next)=>{

  req.models.edu_course_types.find({ id: req.body.eduCourseTypeId },(err,educourse_types)=>{
    if(err){
        next(err,null);
    }
    else if(educourse_types.length > 0 ){
      educourse_types[0].save({
        name:req.body.educourse_type.name,
        status:req.body.educourse_type.status,
        created_by: req.user.id,
        modified_by: req.user.id,
        modified_at: new Date()
      },(err,eduCourseTypes) => {
        if(err)
          next(err,null)
        else
    req.models.edu_course_types.create([
      {
        name:req.body.educourse_type.name,
        status:req.body.educourse_type.status,
        created_by: req.user.id,
        modified_by: req.user.id,
        modified_at: new Date()}
    ],function(err,eduCourseTypes){
      if(err)
        next(err,null)
      else 
      req.models.edu_courses.find({ edu_course_type_id: req.body.eduCourseId },(err,edu_courses)=>{
        if(err){
            next(err,null);
        }
        else if(edu_courses.length > 0 ){
          edu_courses[0].save({
            name:req.body.edu_courses.name,
            status:req.body.edu_courses.status,
            created_by: req.user.id,
            modified_by: req.user.id,
            modified_at: new Date()
          },(err,eduCourses) => {
            if(err)
              next(err,null)
            else    
            req.models.edu_courses.create([
              {
                edu_course_type_id: eduCourseTypes[0].id,
                name:req.body.edu_courses.name,
                status:req.body.edu_courses.status,
                created_by: req.user.id,
                modified_by: req.user.id,
                modified_at: new Date()}
            ],function(err,eduCourses){
              if(err)
                next(err,null)
              else
              req.models.edu_specializations.find({ edu_course_id: req.body.eduSpecializationId },(err,edu_specializations)=>{
                if(err){
                    next(err,null);
                }
                else if(edu_specializations.length > 0 ){
                  edu_specializations[0].save({
                    name:req.body.edu_specializations.name,
                    status:req.body.edu_specializations.status,
                    created_by: req.user.id,
                    modified_by: req.user.id,
                    modified_at: new Date()
                  },(err,eduSpecializations) => {
                    if(err)
                      next(err,null)
                    else
              req.models.edu_specializations.create([
                {
                  edu_course_id: eduCourses[0].id,
                  name: req.body.edu_specializations.name,
                  status:req.body.edu_specializations.status,
                  created_by: req.user.id,
                  modified_by: req.user.id,
                  modified_at: new Date()}
              ],function(err,eduSpecializations){
                if(err)
                  next(err,null)
               else
               req.models.user_educations.find({ id: req.body.UserEducationId },(err,user_educations)=>{
                if(err){
                    next(err,null);
                }
                else if(user_educations.length > 0 ){
                  user_educations[0].save({
                   user_id: req.user.id,
                   edu_course_type_id:eduCourseTypes[0].id,
                   edu_course_id: eduCourses[0].id,
                   edu_specialization_id: eduSpecializations[0].id,
                   institute_name: req.body.institute_name,
                   course_mode: req.body.course_mode,
                   grade: req.body.grade,
                   passing_year: req.body.passing_year,
                   created_by: req.user.id,
                   modified_by: req.user.id,
                   modified_at: new Date()
                  },(err,userEducation) => {
                    if(err)
                      next(err,null)
                    else
               req.models.user_educations.create([
                 {
                   user_id: req.user.id,
                   edu_course_type_id:eduCourseTypes[0].id,
                   edu_course_id: eduCourses[0].id,
                   edu_specialization_id: eduSpecializations[0].id,
                   institute_name: req.body.institute_name,
                   course_mode: req.body.course_mode,
                   grade: req.body.grade,
                   passing_year: req.body.passing_year,
                   created_by: req.user.id,
                  modified_by: req.user.id,
                  modified_at: new Date()}
               ],
               function(err,userEducations){
                if(err)
                  next(err,null)
               else
                  next(null, userEducations)
                })
               })
              }
             })
            })
           })
          }
           })
          })
         })
        }
       })
      })
    })
   }
  })
}

  
  // updateUserEducation = (req,next) =>{
  //   req.models.edu_course_types.find({id: req.user.id},(err,edu_course_types)=>{
  //     if(err){
  //         next(err,null);
  //     }
  //     else 
  //     edu_course_types[0].save({
  //         name:req.body.educourse_type.name,
  //         status:req.body.educourse_type.status,
  //         created_by: req.user.id,
  //         modified_by: req.user.id,
  //         modified_at: new Date()
  //       },(err,eduCourseTypes) => {
  //         if(err)
  //           next(err,null)
  //         else
  //         next(null,eduCourseTypes)
  //     })
  //   })
  // }

getUserEducation = (req,next) => {
  req.models.user_educations.find({'user_id' :req.user.id}, (err, userEducations)=>{
    if(err){
      next(err, null);
    } else if(userEducations && userEducations.length > 0){
      next(null, userEducations);
     
    }
  })
}


saveProfessional = (req,next)=>{
  req.models.user_employments.create([
    { user_id: req.user.id,
      is_current_company: req.body.is_current_company,
      designation: req.body.designation,
      company_name: req.body.company_name,
      worked_month_from: req.body.worked_month_from,
      worked_month_to: req.body.worked_month_to,
      worked_year_from: req.body.worked_year_from,
      worked_year_to: req.body.worked_year_to,
      description: req.body.description,
      created_by: req.user.id,
      modified_by: req.user.id,
      modified_at: new Date()}
     ], function(err,data){ 
    if(err)
      next(err, null)
    else
      next(null,data)
  })
}

getProfessional = (req,next) => {
  req.models.users.find({'id' :req.user.id},function(err, user){
    if(err){
      next(err,null);
    }
    else{
      req.models.user_employments.find({'user_id' :req.user.id},function(err,data){
        if(err){
          next(err,null);
        }
        else{
        var obj = {'user_employments': data[0], 'users': user[0]}
        next(null , obj);
        }
      })
    }
 });
}

saveLanguages = (req,next)=>{
  req.models.user_languages.create([
    {
      user_id: req.user.id,
      name:req.body.name,
      proficency_level:req.body.proficency_level,
      can_read: req.body.can_read,
      can_write: req.body.can_write,
      can_speak: req.body.can_speak,
      created_by: req.user.id,
      modified_by: req.user.id,
      modified_at: new Date()}
  ],function(err,data){
    if(err)
      next(err,null)
    else
      next(null,data)
  })
}

getLanguages = (req,next) =>{
  req.models.users.find({'id' :req.user.id},function(err, user){
    if(err){
      next(err,null);
    }
    else{
      req.models.user_languages.find({'user_id' :req.user.id},function(err,data){
        if(err){
          next(err,null);
        }
        else{
        var obj = {'user_languages': data[0], 'users': user[0]}
        next(null , obj);
        }
      })
    }
 });
}

function shuffle(array, next) {
    var x = array.length, temp, index;
    while (x > 0) {
      // return array[Math.floor(Math.random()*array.length)];
      index = Math.floor(Math.random() * x);
      // document.body.innerHTML = randomItem;
      x--;
      temp = array[x];
      array[x] = array[index];
      array[index] = temp;
    }
    var arr = array[0];
    // console.log(randomItem(array));
    next(null, arr);
  }

module.exports = {
  registerUser,
  saveUser,
  getQuestion,
  createUserAndSocialId,
  createSocialId,
  saveUserProfile,
  getUserProfile,
  saveUserCertificates,
  getUserCertificates,
  saveUserEducation,
  getUserEducation,
  saveProfessional,
  getProfessional,
  getData,
  saveLanguages,
  getLanguages
}


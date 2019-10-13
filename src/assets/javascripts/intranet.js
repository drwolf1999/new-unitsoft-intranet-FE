/**
 * 초기값 설정 or 기타 함수들
 * */
/* eslint-disable */
// $(document).on('focus', '.timepicker', function () {
//     $(this).timepicker({twelveHour: false});
// });
// $(document).on('focus', '.datepicker', function () {
//     $(this).datepicker({format: 'yyyy-mm-dd'});
// });
$(document).on('focus', '.collapsible', function () {
    $(this).collapsible();
});
// $(document).ready(function () {
//     $('select').select2({width: '100%'});
// });
//
// // 오늘 날짜 자동 채우기
// $(document).ready(function () {
//     let date = new Date();
//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     let year = date.getFullYear();
//     let start_hour;
//     let hour = date.getHours();
//     let minute = date.getMinutes();
//     if (minute < 15) minute = 0;
//     else if (minute > 15 && minute < 45) minute = 30;
//     else {
//         minute = 0;
//         hour = hour + 1;
//     }
//     start_hour = hour - 3;
//     if (start_hour < 10) start_hour = "0" + start_hour;
//     if (hour < 10) hour = "0" + hour;
//     if (minute < 10) minute = "0" + minute;
//     if (month < 10) month = "0" + month;
//     if (day < 10) day = "0" + day;
//     $('#now-date').attr('value', year + "-" + month + "-" + day);
//     $('#reload-start').attr('value', year + "-" + (month - 1) + "-" + day);
//     $('#reload-end').attr('value', year + "-" + month + "-" + day);
//     $('#now-date-label').addClass('active');
//     $('#start-time').attr('value', start_hour + ":" + minute);
//     $('#start-time-label').addClass('active');
//     $('#end-time').attr('value', hour + ":" + minute);
//     $('#end-time-label').addClass('active');
// });
//
// function reload_start() {
//     let t = $('#reload-start').val();
//     let element = $('#diary-list').children('div');
//     alert(element.length);
//     console.log('init');
//     for (let i = 0; i < element.length; i++) {
//         console.log(element[i].children('#edit-element'));
//         if (element[i].children('#edit-element > #edit-now-date').length > 0) {
//             alert('%%');
//             let target = element[i].find('#edit-now-date').val();
//             if (target < t) element[i].addClass('hide');
//             else element[i].removeClass('hide');
//         } else alert('@@');
//     }
// }
//
// function reload_end() {
//     let t = $('#reload-end').val();
//     let element = $('#diary-list').children('div');
//     for (let i = 0; i < element.length; i++) {
//         if (element[i].find('#edit-now-date').length > 0) {
//             let target = element[i].find('#edit-now-date').val();
//             alert(target);
//             if (target > t) element[i].addClass('hide');
//             else element[i].removeClass('hide');
//         } else alert('!!');
//     }
// }
//
// // 전체 선택
// $(function () {
//     $('#diary-check-all').click(function () {
//         if ($('#diary-check-all').prop('checked')) {
//             $('input[type=checkbox]').prop('checked', true);
//         } else {
//             $('input[type=checkbox]').prop('checked', false);
//         }
//     })
// });
//
// function convert12Hto24H(time) {
//     let ret = "";
//     if (time.split(' ')[1] === 'AM') {
//         ret += time.split(':')[0];
//     } else {
//         ret += parseInt(time.split(':')[0]) + 12;
//     }
//     ret += ":";
//     ret += time.split(':')[1].split(' ')[0];
//     return ret;
// }
//
// // start ~ end 사이의 시간 계산
// function duration(start, end) {
//     if (start.split(' ').length > 1) {
//         start = convert12Hto24H(start);
//     }
//     if (end.split(' ').length > 1) {
//         end = convert12Hto24H(end);
//     }
//     // alert(start);
//     // alert(end);
//     let hours = end.split(':')[0] - start.split(':')[0];
//     let minutes = end.split(':')[1] - start.split(':')[1];
//     if (minutes < 0) {
//         hours--;
//         minutes = minutes + 60;
//     }
//     return (hours + minutes / 60).toFixed(1);
// }
//
// /**
//  * 각각의 index에서 사용하는 함수들
//  * */
// function search_student() {
//     $.ajax({
//         type: "POST",
//         url: "/students/search/",
//         data: {keyword: $.trim($('#search-input').val()),},
//         dataType: "JSON",
//         success: function (data) {
//             let table = $("table#students > tbody");
//             table.html("");
//             for (var i = 0; i < data.length; i++) {
//                 table.append("<tr><td>" + i +
//                     "<td><a href='/students/" + data[i]._id + "'>" + data[i].name + "</a>" +
//                     "<td>" + data[i].school + " " + data[i].grade + "학년" +
//                     "<td>" + data[i].unitstudy_id +
//                     // TODO 관리자나 원장님만 적용되도록 해야함
//                     "<td><input type='button' class='btn btn-gray' value='삭제'>" +
//                     "</td>");
//             }
//         },
//         error: function () {
//             // TODO 이부분을 alert가 아닌 다른 것으로 대체!!
//             alert('문제가 발생했습니다. 서버 개발자한테 문의하세요.');
//         },
//     });
// }
//
// // 학생 추가
// function add_student() {
//     if ($.trim($('#name').val()) === '') {
//         // TODO 이부분을 alert가 아닌 다른 것으로 대체!!
//         alert('이름은 필수로 입력해야합니다!!');
//         return;
//     }
//     $.ajax({
//         type: "POST",
//         url: "/students/add",
//         data: {
//             name: $.trim($('#name').val()),
//             school: $.trim($('#school').val()),
//             grade: $.trim($('#grade').val()),
//             phone: $.trim($('#phone').val()),
//             parent_phone: $.trim($('#parent_phone').val()),
//             unitstudy_id: $.trim($('#unitstudy_id').val()),
//         },
//         success: function (data) {
//             $('#name').val("");
//             $('#school').val("");
//             $('#grade').val("");
//             $('#phone').val("");
//             $('#parent_phone').val("");
//             $('#unitstudy_id').val("");
//             alert('성공했습니다.');
//         },
//         error: function (data) {
//             // TODO 이부분을 alert가 아닌 다른 것으로 대체!!
//             alert('문제가 발생했습니다. 서버 개발자한테 문의하세요.');
//         }
//     });
// }
//
// function modify_student() {
//     let input = [$('#school'), $('#grade'), $('#phone'), $('#parent-phone'), $('#unitstudy-id')];
//     input.forEach(function (element) {
//         element.attr('disabled', false);
//     });
//     $('#change-btn').addClass('hide');
//     $('#do-chang-btn').removeClass('hide');
// }
//
// function do_modify_student() {
//     $.ajax({
//         type: "POST",
//         url: "/students/" + $('#student-id').val() + "/update",
//         data: {
//             school: $.trim($('#school').val()),
//             grade: $.trim($('#grade').val()),
//             phone: $.trim($('#phone').val()),
//             parent_phone: $.trim($('#parent-phone').val()),
//             unitstudy_id: $.trim($('#unitstudy-id').val()),
//         },
//         success: function (data) {
//             let input = [$('#school'), $('#grade'), $('#phone'), $('#parent-phone'), $('#unitstudy-id')];
//             input.forEach(function (element) {
//                 element.attr('disabled', true);
//             });
//             $('#change-btn').removeClass('hide');
//             $('#do-chang-btn').addClass('hide');
//         },
//         error: function (data) {
//             data.forEach(function (d) {
//                 alert(d);
//             });
//             // alert(data);
//         }
//     })
// }
//
// function search_teacher() {
//     $.ajax({
//         type: "POST",
//         url: "/teachers/search/",
//         data: {keyword: $.trim($('#search-input').val()),},
//         dataType: "JSON",
//         success: function (data) {
//             let table = $("table#teachers > tbody");
//             table.html("");
//             for (var i = 0; i < data.length; i++) {
//                 table.append("<tr><td>" + i +
//                     "<td><a href='/teachers/" + data[i]._id + "'>" + data[i].name + "</a>" +
//                     "<td>" + data[i].department +
//                     "</td>");
//             }
//         },
//         error: function () {
//             // TODO 이부분을 alert가 아닌 다른 것으로 대체!!
//             alert('문제가 발생했습니다. 서버 개발자한테 문의하세요.');
//         },
//     });
// }
//
// // 선생님 추가
// function add_teacher() {
//     if ($.trim($('#name').val()) === '') {
//         // TODO 이부분을 alert가 아닌 다른 것으로 대체!!
//         alert('이름은 필수로 입력해야합니다!!');
//         return;
//     }
//     $.ajax({
//         type: "POST",
//         url: "/teachers/add",
//         data: {
//             name: $.trim($('#name').val()),
//             department: $.trim($('#department').val()),
//             phone: $.trim($('#phone').val()),
//         },
//         success: function (data) {
//             $('#name').val("");
//             $('#department').val("");
//             $('#phone').val("");
//             alert('성공했습니다.');
//         },
//         error: function (data) {
//             // TODO 이부분을 alert가 아닌 다른 것으로 대체!!
//             alert('문제가 발생했습니다. 서버 개발자한테 문의하세요.');
//         }
//     });
// }
//
// function modify_teacher() {
//     let input = [$('#department'), $('#phone')];
//     input.forEach(function (element) {
//         element.attr('disabled', false);
//     });
//     $('#change-btn').attr('hidden', true);
//     $('#do-chang-btn').attr('hidden', false);
// }
//
// function do_modify_teacher() {
//     $.ajax({
//         type: "POST",
//         url: "/teachers/" + $('#teacher-id').val() + "/update",
//         data: {
//             school: $.trim($('#department').val()),
//             phone: $.trim($('#phone').val()),
//         },
//         success: function (data) {
//             let input = [$('#department'), $('#phone')];
//             input.forEach(function (element) {
//                 element.attr('disabled', true);
//             });
//             $('#change-btn').attr('hidden', false);
//             $('#do-chang-btn').attr('hidden', true);
//         },
//         error: function (data) {
//             data.forEach(function (d) {
//                 alert(d);
//             });
//             // alert(data);
//         }
//     })
// }
//
// function search_lesson() {
//     $.ajax({
//         type: "POST",
//         url: "/lessons/search/",
//         data: {keyword: $.trim($('#search-input').val()),},
//         dataType: "JSON",
//         success: function (data) {
//             let table = $("table#lessons > tbody");
//             table.html("");
//             for (var i = 0; i < data.length; i++) {
//                 table.append("<tr><td>" + i +
//                     "<td><a href='#'>" + data[i].type + "</a>" +
//                     // "<td><a href='/lessons/" + data[i]._id + "'>" + data[i].type + "</a>" +
//                     "</td>");
//             }
//         },
//         error: function () {
//             // TODO 이부분을 alert가 아닌 다른 것으로 대체!!
//             alert('문제가 발생했습니다. 서버 개발자한테 문의하세요.');
//         },
//     });
// }
//
// // 수업 추가
// function add_lesson() {
//     if ($.trim($('#lesson-type').val()) === '') {
//         alert('값을 채워주세요!!');
//         return;
//     }
//     $.ajax({
//         type: "POST",
//         url: "/lessons/add",
//         data: {
//             type: $.trim($('#lesson-type').val()),
//         },
//         success: function (data) {
//             $('#type').val("");
//             alert('성공');
//         },
//         error: function () {
//             alert('실패');
//         },
//     });
// }
//
// /**
//  * 일지 작성 페이지에서 사용하는 함수들
//  * */
// // 일지 추가
// function add_student_diary() {
//     let student_id = $.trim($('#student-id').val());
//     let date = $('#now-date').val();
//     let start = $('#start-time').val().toString();
//     let end = $('#end-time').val().toString();
//     let teacher = $('#teacher').val();
//     let lesson_type = $('#lesson-type').val();
//     let lesson_about = $.trim($('#lesson-about').val());
//     let time = duration(start, end);
//     $.ajax({
//         type: "POST",
//         url: "/students/diary/add/",
//         data: {
//             // diary 작성 관리
//             student_id: student_id,
//             teacher: teacher,
//             lesson_type: lesson_type,
//             lesson_time: JSON.stringify({
//                 date: date,
//                 start: start,
//                 end: end,
//             }),
//             lesson_about: lesson_about,
//             // 학생 시간 관리
//             time: time,
//         },
//         success: function (msg) {
//             // TODO 비동기로 작성한 일지를 추가하게끔 수정해야함
//             location.reload();
//             // alert(msg);
//         },
//         error: function (data) {
//             alert('에러!');
//         },
//     });
// }
//
// // 선생님 일지 추가
// function add_teacher_diary() {
//     let teacher_id = $.trim($('#teacher-id').val());
//     let date = $('#now-date').val();
//     let start = $('#start-time').val().toString();
//     let end = $('#end-time').val().toString();
//     let lesson_type = $('#lesson-type').val();
//     let time = duration(start, end);
//     let append_items = $('#append-student').children();
//     let students = [];
//     for (let i = 0; i < append_items.length; i++) {
//         let student = $(append_items).eq(i);
//         let sstart = student.find('#student-start-time').val();
//         let send = student.find('#student-end-time').val();
//         let stime = duration(sstart, send);
//         students.push(JSON.stringify({
//             student: $(append_items).eq(i).attr('id'),
//             lesson_time: JSON.stringify({
//                 date: date,
//                 start: sstart,
//                 end: send,
//             }),
//             lesson_about: $.trim(student.find('#student-lesson-about').val()),
//             time: stime,
//         }));
//     }
//     jQuery.ajaxSettings.traditional = true;
//     $.ajax({
//         type: "POST",
//         url: "/teachers/diary/add",
//         data: {
//             teacher: teacher_id,
//             lesson_type: lesson_type,
//             lesson_time: JSON.stringify({
//                 date: date,
//                 start: start,
//                 end: end,
//             }),
//             time: time,
//             students: students,
//         },
//         success: function (msg) {
//             location.reload();
//         },
//         error: function (data) {
//             alert('error');
//         }
//     });
// }
//
// // 학생 일지 처리 완료
// function student_complete_diary(element) {
//     let diary_time = $('#' + element.id + "-time").val().toString();
//     let time = duration(diary_time.split('-')[0], diary_time.split('-')[1]);
//     let ElementParent = $(element).parent();
//     $.ajax({
//         type: "POST",
//         url: "/students/diary/complete/" + element.id,
//         data: {
//             userId: $('#student-id').val(),
//             time: time,
//         },
//         success: function (msg) {
//             ElementParent.children('#diary-complete').addClass('hide');
//             ElementParent.children('#' + element.id).addClass('hide');
//             $('#total-count').attr('value', $('#total-count').val() - 1);
//             $('#total-time').attr('value', $('#total-time').val() - time);
//             // alert(msg);
//         },
//         error: function (msg) {
//             alert("error");
//         }
//     })
// }
//
// function edit_diary(element) {
//     let this_tag = $(element).parent();
//     let id = $.trim(this_tag.children('#element-id').val());
//     let studentid = $.trim(this_tag.children('#student-id').val());
//     let date = $.trim(this_tag.children('#edit-now-date').val());
//     let start_time = $.trim(this_tag.children('#edit-start-time').val());
//     let end_time = $.trim(this_tag.children('#edit-end-time').val());
//     let lesson_about = $.trim(this_tag.children('#edit-lesson-about').val());
//     let time = duration(start_time, end_time);
//     let diary_time = $('#' + element.id + "-time").val().toString();
//     let d_time = duration(diary_time.split('-')[0], diary_time.split('-')[1]);
//     d_time = time - d_time;
//     $.ajax({
//         type: "POST",
//         url: "/students/diary/edit/" + id,
//         data: {
//             studentid: studentid,
//             // diary 작성 관리
//             lesson_time: JSON.stringify({
//                 date: date,
//                 start: start_time,
//                 end: end_time,
//             }),
//             lesson_about: lesson_about,
//             // 학생 시간 관리
//             time: d_time,
//         },
//         success: function (msg) {
//             // TODO 비동기로 작성한 일지를 추가하게끔 수정해야함
//             location.reload();
//             // alert(msg);
//         },
//         error: function (data) {
//             alert('에러!');
//         },
//     });
// }
//
// function switch_diary(element) {
//     let this_tag = $(element);
//     this_tag.parent().parent().children('#edit-element').removeClass('hide');
//     this_tag.parent().addClass('hide');
// }
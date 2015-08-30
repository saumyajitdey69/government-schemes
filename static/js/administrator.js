function show_constraints(){
	$.ajax({
		method:'POST',
		url:'../show_constraints',
		success: function(data){

		}
	});

}

function loadNextDiv(){
  var answerType = $('#answer-type').find(":selected").text();
  console.log(answerType);
  if(answerType==='Range'){
    console.log(answerType);

    var htmlcontents="<label id='answer-space'>Range</label><div id='answer-sp'><div class='col-lg-12'><div class='col-lg-6'> <input autocomplete='off' class='input form-control' id='lower-limit' name='lower' type='number' placeholder='Lower Limit'/></div><div class='col-lg-6'> <input autocomplete='off' class='input form-control' id='higher-limit' name='higher-limit' type='number' placeholder='Higher Limit'/></div></div></div>";
    $('.answer-space').html('');
    $('.answer-space').html(htmlcontents);
  }
  if(answerType==='Text'){
    var htmlcontents="<label id='answer-space'>Text</label><div id='answer-sp'><input autocomplete='off' class='input form-control' id='answer' name='textans' type='text' placeholder='Text Answer'/></div>";
    $('.answer-space').html('');
    $('.answer-space').html(htmlcontents);
  }
  if(answerType=='List Of Options'){
    var htmlcontents="<label id='answer-space'>List of Options</label><div id='answer-sp'><label>Add options to the list separated by semicolons</label><input autocomplete='off' class='input form-control' id='answer' name='list' type='text' placeholder='Options separated by semicolon'/></div>";
    $('.answer-space').html('');
    $('.answer-space').html(htmlcontents);
  }
  if(answerType=='Yes/No'){
    var htmlcontents="<label id='answer-space'>Yes/No</label><div id='answer-sp'><select class='form-control' id='answer-yesno'><option>--Select--</option><option value='1'>Yes</option><option value='0'>No</option></select></div>";
    $('.answer-space').html('');
    $('.answer-space').html(htmlcontents);     
  }
  if(answerType=='Value'){
    var htmlcontents="<label id='answer-space'>Number</label><div id='answer-sp'><input autocomplete='off' class='input form-control' id='answer' name='numans' type='number' placeholder='Numberical Answer'/></div>";
    $('.answer-space').html('');
    $('.answer-space').html(htmlcontents);
  }
}
$(document).ready(function(){
  var next = 1;
  var master_data={};
  var data={};
  var info={};
  $(".add-more").click(function(){


    var answerType=$('#answer-type').find(":selected").val();
    var answer=$('#answer').val();
    data={
      'constraint_name':$('#constraint-name').val(),
      'answer_type':answerType
    }
    if(answerType==='3'){
      data['fields']=answer;
    }
    if(answerType==='1'){
      data['fields']=$('#lower-limit').val()+";"+$('#higher-limit').val();
    }
    if(answerType==='2'){
      data['fields']=answer;
    }
    if(answerType==='4'){
      data['fields']=$('#answer-yesno').find(":selected").val();
    }
    if(answerType==='5'){
      data['fields']=answer;
    }
    data['id']=next+1;
    if(!master_data.hasOwnProperty('constraints'))
      master_data['constraints']=[];
    master_data['constraints'].push(data);

    console.log(master_data);



    console.log('inside dd More');
  var constraint_name = document.getElementById('constraint-name').value;
  

  var addto = "#field" + next;
  var addRemove = "#field" + (next);
  next = next + 1;
  var newIn ='<div class=" col-lg-12 container" id="field' + next + '" name="field' + next +'"><div class=" col-lg-10 container"><label>Constraint name: </label><p>'+constraint_name+'</p></div><div class=" col-lg-2 container"><button id="remove ' + (next) + '" class="btn btn-danger remove-me" >-</button></div></div></div>';
  //var newIn = '<input autocomplete="off" class="input form-control" id="field' + next + '" name="field' + next + '" type="text">';
  var newInput = $(newIn);
  //var removeBtn = ;
  //var removeButton = $(removeBtn);

  $(addRemove).after(newInput);
  //$(addRemove).after(removeButton);

  $("#field" + next).attr('data-source',$(addto).attr('data-source'));
  $("#count").val(next);  

  $('.remove-me').click(function(e){
    e.preventDefault();

          var index = this.id.indexOf(" ");  // Gets the first index where a space occours
          var fieldNum = this.id.substr(index + 1);  // Gets the text part
          var fieldID = "#field" + fieldNum;
          var i=0;
          for(i=0;i<master_data['constraints'].length;i++){
            
            if(master_data['constraints'][i]['id']==fieldNum){
              master_data['constraints'].splice(i,1);
            }
          }
          $(this).remove();
          $(fieldID).remove();
        });
});
$('.submit-btn').click(function(){
  if(!master_data.hasOwnProperty('info'))
    master_data['info']={};
  master_data['info']['scheme_name']=$('#scheme-name').val();
  master_data['info']['scheme_details']=$('#scheme-details').val();
  master_data['info']['start_date']=$('#start-date').val();
  master_data['info']['end_date']=$('#end-date').val();
  master_data['info']['department']=$('#department').val();
  console.log(JSON.stringify(master_data));
  $.ajax({
    method:'POST',
    url:'/administrator/submit_scheme/',
    data:{
      csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),
      master_data:(JSON.stringify(master_data)),
    },
    success:function(data){
      console.log(data);
      //window.alert("Scheme is Uploaded");
      location.reload();
    }
  });
});
});
// function populate(){
//   var answerType=$('#answer-type').find(":selected").val();
//   var answer=$('#answer').val();
//   var data={
//     'constraint_name':$('#constraint-name').html(),
//     'answer_type':answerType
//   }
//   if(answerType==='3'){
//     data['fields']=answer;
//   }
//   if(answerType==='1'){
//     data['fields']=$('#lower-limit').val()+";"+$('#upper-limit').val();
//   }
//   if(answerType==='2'){
//     data['fields']=answer;
//   }
//   if(answerType==='4'){
//     data['fields']=$('#answer-yesno').find(":selected").val();
//   }
//   if(answerType==='5'){
//     data['fields']=answer;
//   }
// }

function loadConstraints(){
  var constraintName = $('#choose-constraint').find(":selected").text();
  var constraintType = $('#choose-constraint').find(":selected").val();

  if(constraintType==='-1'){ 
    $('#constraint-name').val("");
    $("#constraint-name").prop("disabled",false);
    $('#answer-type').val("--Select Type--");
    $('#answer-type').prop("disabled",false);
    return;
  }
  console.log(constraintType);
  $('#constraint-name').val(constraintName);
  $("#constraint-name").prop("disabled",true);
  if(constraintType==='1'){ 
    $('#answer-type').prop("disabled",false);
    $('#answer-type').val(1).change();
    $('#answer-type').prop("disabled",true);
  }
  if(constraintType==='2'){
    ('#answer-type').val(2).change();
    $('#answer-type').prop("disabled",true);
  }
  if(constraintType==='3'){
    $('#answer-type').val(3).change();
    $('#answer-type').prop("disabled",true);
  }
  if(constraintType==='4'){
    $('#answer-type').val(4).change();
    $('#answer-type').prop("disabled",true);
  }
  if(constraintType==='5'){
    $('#answer-type').val(5).change();
    $('#answer-type').prop("disabled",true);
  }
}
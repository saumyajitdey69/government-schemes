$(function(){

	$('#dataTables-example').DataTable({
                responsive: true
        });


	
	$('#static-age').click(function(){
		//window.alert('fuck this shit');
		$('.static-age-modal').modal('show');
	});

	$('.filter-age').click(function(){
		$.ajax({
			method:'POST',
			data:{
				'age':$('#selected-age').val(),
				csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),
			},
			url:'../filterage/',
			success:function(data){
				$('#tbodyid').html('');
				for(i=0;i<data.length;i++){
					var htmlcontents="<tr class='gradeX'><td>"+data[i][1]+"</td><td>"+data[i][2]+"</td><td>"+data[i][4]+"</td></tr>";
					$('#tbodyid').append(htmlcontents);
				}
			}
		});
	});

	$('#static-dept').click(function(){
		//window.alert('fuck this shit');
		$('.static-dept-modal').modal('show');
	});

	$('.filter-dept').click(function(){
		//filter department
	});

	$('#static-category').click(function(){
		//window.alert('fuck this shit');
		$('.static-category-modal').modal('show');
	});

	$('.filter-category').click(function(){
		$.ajax({
			method:'POST',
			data:{
				'category':$('#selected-category').val(),
				csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),
			},
			url:'../filtercategory/',
			success:function(data){
				$('#tbodyid').html('');
				for(i=0;i<data.length;i++){
					var htmlcontents="<tr class='gradeX'><td>"+data[i][1]+"</td><td>"+data[i][2]+"</td><td>"+data[i][4]+"</td></tr>";
					$('#tbodyid').append(htmlcontents);
				}
			}
		});
	});
})
$(function(){

var attr='';
$('#dynamic-filter').click(function(){
	//window.alert("HEELLO");
	$.ajax({
		url:"/get_question/",
		method:"POST",
		data:{
			csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),
		},
		success: function(data){
			console.log(data);
			if(data['flag']==0){
				$('#filter-title').html(data['message']);
			}
			else{
				attr=data['attr'];
				$('#filter-title').html("<h4>"+data['message']+data['attr']+"</h4>");
			}
		}
	});
});

// $('.filter-better').click(function(){
// 	//window.alert("HEELLO");
// 	$.ajax({
// 		url:"../filter_data/",
// 		method:"POST",
// 		if(attr=="Category")
// 			data:{
// 				csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),
// 				category:$('#machine-category').val(),
// 			},
// 		success: function(data){

			
// 		}
// 	});
// });

})

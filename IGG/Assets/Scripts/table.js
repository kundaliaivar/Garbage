$(document).ready( function () {
   $('#table_id').dataTable( {
   "oLanguage": 
			         { "sLengthMenu": 'Display <select>'+
			            '<option value="20">20</option>'+
			            '<option value="30">30</option>'+
			            '<option value="40">40</option>'+
			            '<option value="50">50</option>'+
			            '<option value="-1">All</option>'+
			            '</select> records'
			      },
    "sScrollY": "200px",
     "bPaginate": true,
    "sPaginationType": "full_numbers"
   
    } );
    $('select').chosen({
                
            });
           // $('.dataTables_filter input').addClass('iconicStroke search ');
            $('.dataTables_filter').append('<span class="iconicStroke search ">F</span>');
} );
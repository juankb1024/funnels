var goal_id_update = 0;
var comply =  true;

// init the funnel form with existing funnel values, if any
function initFunnelForm(funnelMethodAPI, submitText, goalName, goalId, steps, funnelId)
{
    if (goalId != undefined){
//        $('input[name=goalIdUpdate]').val(goalId);
        goal_id_update = goalId;
        $('[name=goal_id]').hide();
        $('#goal_name').text(goalName);
        $('#goal_name').show();
    }else{
//        $('input[name=goalIdUpdate]').val('');
        goal_id_update = 0;
        $('[name=goal_id]').show();
        $('#goal_name').hide();
    }
    if(funnelId != undefined) {
        $('input[name=funnelIdUpdate]').val(funnelId);
    }
    if (steps != undefined) {
        $.each(steps, function(index, value) { 
            $('#step_name_' + value.idstep).val(value.name);
            $('#step_pattern_' + value.idstep).val(value.url);
            $('#step_pattern_type_' + value.idstep).val(value.pattern_type);
            $('#step_case_' + value.idstep).each(function() {
                this.checked = value.case_sensitive == 1 ? true : false;
            });
            $("input[name=match_attribute_" + value.idstep + "]").filter("[value=" + value.match_attribute + "]").attr("checked", true);
            
            //Show correct match_atribute input element   
            var matchTypeId = value.match_attribute;
            if ( matchTypeId == "goal")
            {
                $("#step_pattern_goal_" + value.idstep).show();
                $("#match_attribute_name_" + value.idstep).hide();
                $("select[name=goal_step_id_" + value.idstep + "] option[value='" + value.url + "']").attr('selected', 'selected');
            }else{
                $("#step_pattern_goal_" + value.idstep).hide();
                $("#match_attribute_name_" + value.idstep).show();
            }
            
        });
        
        $('select[name*=goal_step_id_]').each(function (index) {
            $(this).change(function () {
            
                alertGoalCompliance();
            
            });
        });
        
        alertGoalCompliance();
    }
    
    $('select[name=goal_id]').change(function () {
            
        alertGoalCompliance();
    });
    
    $('input[name=methodFunnelAPI]').val(funnelMethodAPI);
    $('#funnel_submit').val(submitText);
}

function showAddNewFunnel()
{
    $("#FunnelForm").show();
    $("#EditFunnels").hide();
    piwikHelper.lazyScrollTo("#AddEditFunnels", 400);
    return false;
}

function showEditFunnels()
{
    $("#EditFunnels").show();
    $("#FunnelForm").hide();
    piwikHelper.lazyScrollTo("#AddEditFunnels", 400);
    return false;
}

function bindFunnelForm()
{

    $('#funnel_submit').click( function() {
        
        //Check to see if Goals comply
        alertGoalCompliance();
//        comply=true;
//        $('select[name*=goal_step_id_]').each(function (index) {
//        
//            //Get Id
//            var id_parts = this.name.split('_');
//            var id = id_parts[id_parts.length - 1];
//            
//            // Check to see if ultimate Goal has changed
////            goal_id_update = $('select[name="goal_id"]').val();
//
//            //Is there a compliance error?
//            if($('#match_attribute_goal_'+ id).is(':checked'))
//            {
//                //console.log($('#match_attribute_goal_'+ id).val());
//                comply &= ($(this).val() != goal_id_update);
//                
//            }
//            
//        });
       
        //Does it comply
        if(comply){
            // prepare ajax query to API to add funnel
            ajaxRequestAddEditFunnel = getAjaxAddEditFunnel();
            $.ajax( ajaxRequestAddEditFunnel );
            return false;
        }else{
            alert("You must not repeat Goals in Funnel Goal");
            return false;
        }
    });

    $('a[name=linkAddNewFunnel]').click( function(){ 
        initAndShowAddFunnelForm();
    });
    // To avoid having to type the name or id of the goal to be converted in each step.
    $('input[name*=match_attribute]').each( function(index) {
        var id_parts = this.name.split('_');
        var id = id_parts[id_parts.length - 1];
        
        $(this).click( function () {
            //            console.log($(this).val());
            var matchTypeId = $(this).val();
            if ( matchTypeId == "goal")
            {
                $("#step_pattern_goal_" + id).show();
                $("#match_attribute_name_" + id).hide();
//                alertGoalCompliance();
            }else{
                $("#step_pattern_goal_" + id).hide();
                $("#match_attribute_name_" + id).show();
            }
            alertGoalCompliance();
        });
    });
    
    $('select[name*=goal_step_id_]').each(function (index) {
        $(this).change(function () {
            
            alertGoalCompliance();
            
        });
    });
    
    $('select[name=goal_id]').change(function () {
            
        alertGoalCompliance();
    });
    
    alertGoalCompliance();
}

//Alerts the user to not use the ultimate Goal as a step
function alertGoalCompliance()
{
    comply = true;
    var steps = new Array();
    
    $('select[name*=goal_step_id_]').each(function (index) {
        
        steps.push($(this));

        goal_id_update = $('select[name="goal_id"]').val();
        
        // Get id
        var id_parts = this.name.split('_');
        var id = id_parts[id_parts.length - 1];
 
        //Reset Warnings
        $('#step_pattern_goal_help_'+id).hide();
        //            comply = true;
            
        if( $('#match_attribute_goal_'+ id).is(':checked') && $(this).val() == goal_id_update )
        {
            $("#step_pattern_goal_help_"+ id).show();
            comply &= false;
        }

    });
    
    for( var i = 0; i < steps.length; i++)
    {
        for( var j = 0; j < steps.length; j++)
        {
//            console.info(i);
//                console.info(j);
////                console.info(i+1);
////                console.info(j+1);
//                console.info(steps[i]);
//                console.info(steps[j]);
//                console.info(steps[i].val());
//                console.info(steps[j].val());
            if( $('#match_attribute_goal_'+ (i+1)).is(':checked') && $('#match_attribute_goal_'+ (j+1)).is(':checked') && steps[i].val() == steps[j].val() && i != j )
            {
//                console.info(i);
//                console.info(j);
//                console.info(steps[i]);
//                console.info(steps[j]);
//                console.info(steps[i].val());
//                console.info(steps[j].val());
                console.info($('#match_attribute_goal_'+ (i+1)));
                console.info($('#match_attribute_goal_'+ (j+1)));
                
                $("#step_pattern_goal_help_"+ (i+1)).show();
                $("#step_pattern_goal_help_"+ (j+1)).show();
                comply &= false;
            }
        }
    }
}

function bindListFunnelEdit()
{
    $('a[name=linkEditFunnel]').click( function() {
        var funnelId = $(this).attr('id');
        var funnel = piwik.funnels[funnelId];
        var goalId = funnel.idgoal;
        var goalName = funnel.goal_name;
        var steps = funnel.steps;
        initFunnelForm("Funnels.updateFunnel", _pk_translate('Funnels_UpdateFunnel_js'), goalName, goalId, steps, funnel.idfunnel);
        showAddNewFunnel();
        return false;
    });

    $('a[name=linkDeleteFunnel]').click( function() {
        var funnelId = $(this).attr('id');
        var funnel = piwik.funnels[funnelId];
        if(confirm(sprintf(_pk_translate('Funnels_DeleteFunnelConfirm_js'), '"'+funnel.goal_name+'"')))
        {
            $.ajax( getAjaxDeleteFunnel( funnelId, funnel.idgoal ) );
        }
        return false;
    });

    $('a[name=linkEditFunnels]').click( function(){ 
        return showEditFunnels(); 
    } );

}

function getAjaxDeleteFunnel(idFunnel, idGoal)
{
    var ajaxRequest = piwikHelper.getStandardAjaxConf('funnelAjaxLoading', 'funnelAjaxError');
    piwikHelper.lazyScrollTo("#AddEditFunnels", 400);

    var parameters = {};
    parameters.idSite = piwik.idSite;
    parameters.idFunnel =  idFunnel;
    parameters.idGoal =  idGoal;
    parameters.method =  'Funnels.deleteFunnel';
    parameters.module = 'API';
    parameters.format = 'json';
    parameters.token_auth = piwik.token_auth;
    ajaxRequest.data = parameters;
    return ajaxRequest;
}

function getAjaxAddEditFunnel()
{
    var ajaxRequest = piwikHelper.getStandardAjaxConf('funnelAjaxLoading', 'funnelAjaxError');
    piwikHelper.lazyScrollTo("#AddEditFunnels", 400);
    var parameters = {};

    parameters.idSite = piwik.idSite;
    // Updating an existing funnel for a goal
    parameters.idGoal = $('input[name=goalId]').val();
    // New funnel 
    if (parameters.idGoal == ''){
        parameters.idGoal = $('[name=goal_id]').val();
    }
    parameters.idFunnel = $('input[name=funnelIdUpdate]').val();

    parameters.steps = {};
    // Funnel steps
    $('input[name=step_name]').each(function(index){

        var id_parts = this.id.split('_');
        var id = id_parts[id_parts.length - 1];
        var pattern = $("#step_pattern_" + id).val();
                                    
        var pattern_type;
        var name;
        var match_attribute;
        var case_sensitive;

        if (pattern != ''){

            pattern_type = $("#step_pattern_type_" + id).val();
            name = $(this).val();
            match_attribute = $("input[name=match_attribute_" + id + "]:checked").val();
            case_sensitive = $("#step_case_" + id).is(':checked') ? 1 : 0;
            
            //console.log(pattern_type);
            //console.log($("#step_pattern_" + id));
            //console.log(pattern);

            parameters.steps[id] = {};
            parameters.steps[id]['name'] = encodeURIComponent(name);
            parameters.steps[id]['pattern'] = encodeURIComponent(pattern);
            parameters.steps[id]['pattern_type'] = encodeURIComponent(pattern_type);
            parameters.steps[id]['match_attribute'] = encodeURIComponent(match_attribute);
            parameters.steps[id]['case_sensitive'] = case_sensitive;
            parameters.steps[id]['id'] = id;
        }

       // If it´s a goal
       if ($("input[name=match_attribute_" + id + "]:checked").val() == "goal")
       {
                                    
                                    
            name = $(this).val();
            match_attribute = "goal";
            pattern = $("#step_pattern_goal_" + id).val();
            pattern_type = "exact";
            case_sensitive = 1;
            
            //console.log(pattern_type);
            //console.log($("#step_pattern_" + id));
            //console.log($("#step_pattern_goal_" + id).val());
            //console.log(pattern);
            
            parameters.steps[id] = {};
            parameters.steps[id]['name'] = encodeURIComponent(name);
            parameters.steps[id]['pattern'] = encodeURIComponent(pattern);
            parameters.steps[id]['pattern_type'] = encodeURIComponent(pattern_type);
            parameters.steps[id]['match_attribute'] = encodeURIComponent(match_attribute);
            parameters.steps[id]['case_sensitive'] = case_sensitive;
            parameters.steps[id]['id'] = id;
        }
                                    
        // else Ajax Error by piwikHelper.getStandardAjaxConf
    });

    parameters.method =  $('input[name=methodFunnelAPI]').val();
    parameters.module = 'API';
    parameters.format = 'json';
    parameters.token_auth = piwik.token_auth;

    ajaxRequest.data = parameters;
    return ajaxRequest;
}

function initAndShowAddFunnelForm()
{
    initFunnelForm('Funnels.addFunnel', _pk_translate('Funnels_AddFunnel_js'));
    return showAddNewFunnel(); 
}

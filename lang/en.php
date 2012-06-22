<?php 
/**
 * Piwik - Open source web analytics
 * Funnel Plugin - Analyse and visualise goal funnels
 * 
 * @link http://mysociety.org
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 * @version 0.2
 * 
 * @category Piwik_Plugins
 * @package Piwik_Funnels
 */


$translations = array(
    'Funnels_PluginDescription' => 'Allows the definition, analysis and visualisation of funnels associated with goals.',
    'Funnels_Funnels' => 'Funnel',
    'Funnels_Overview' => 'Overview',
    'Funnels_NoFunnelsNeedAccess' => 'Only an Administrator or the Super User can add Funnels for a given website. Please ask your Piwik administrator to set up a Funnel for a Goal for your website.',
    'Funnels_AddNewFunnel' => 'Add a new Goal Funnel',	
    'Funnels_AddNewFunnelLink' => 'Add a new Goal Funnel',
    'Funnels_Funnel' => 'Funnel',
    'Funnels_FunnelsManagement' => 'Funnels Management',
    'Funnels_AtLeastOneGoal' => 'Your page must have at least one goal to use Funnels',
    'Funnels_EditExistingFunnel' => 'Edit existing Goal Funnels',
    'Funnels_AddNewGoal' => 'Add a new Goal',
    'Funnels_GoalsPluginDeactivated' => 'In order to add Funnels, you need to activate the Goals plugin.',
    'Funnels_FunnelGoal' => 'Goal',
    'Funnels_FunnelGoalHelp' => 'This goal will be the last step in your funnel.', 
    'Funnels_AddFunnel_js' => 'Add Funnel',
    'Funnels_UpdateFunnel_js' => 'Update Funnel',
    'Funnels_DeleteFunnelConfirm_js' => 'Are you sure you want to delete the Funnel for %s?',
    'Funnels_Step' => 'Step', 
    'Funnels_StepHelp' => 'Define your funnel steps below by URL or title.',
    'Funnels_StepUrl' => 'Page URL (e.g. "http://www.example.com/step1.html")',
    'Funnels_StepUrlHelp' => 'A request for this URL will be recorded as a match to the funnel step',
    'Funnels_StepName' => 'Page title',
    'Funnels_StepNameHelp' => 'A request for a page with this title will be recorded as a match to the funnel step',
    'Funnels_FunnelConversionRate' => 'funnel conversion rate',
    'Funnels_ContinuedToNextStep' => 'continued to next step',
    'Funnels_Name' => 'Step Name',
    'Funnels_Match' => 'Step Match',
    'Funnels_MatchHelp' => 'When visitors...',
    'Funnels_MatchWhere' => 'Where Match',
    'Funnels_MatchWhereHelp' => "eg. contains 'checkout/confirmation'<br />eg. is exactly 'http://example.com/thank-you.html'<br />eg. matches the expression '(.*)\/demo\/(.*)'",
    'Funnels_MatchCase' => 'Case Sensitive?',
    'Funnels_PatternContains' => 'contains',
    'Funnels_PatternExact' => 'is exactly',
    'Funnels_PatternRegex' => 'matches the expression',
    'Funnels_MatchVisitUrl' => 'Visit a given URL (page or group of pages)',
    'Funnels_MatchVisitPageTitle' => 'Visit a given Page Title',
    'Funnels_MatchVisitPageGoal' => 'Convert a given Goal',
    'Funnels_MatchVisitPageGoalHelp' => 'Converts the Goal:',
    'Funnels_GoalError' => 'You cannot repeated Goals in a Funnel\'s steps',
    'Funnels_GoalStep' => 'id: '
);

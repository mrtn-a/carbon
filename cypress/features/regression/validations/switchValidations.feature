Feature: Switch validations component
	I want to change Switch validations component properties

	Background: Open Switch validations component page
		Given I open "Experimental Switch" component page validations

	@positive
	@validations
	Scenario Outline: Verify the <state> validation of Switch component
		When I click onto <position> switch
			And I click onto <position> switch again
			And I hover mouse onto "<state>" icon
		Then tooltipPreview on preview into iFrame is set to "<text>"
			And icon name on preview is "<state>"
		Examples:
			| state   | position | text          |
			| error   | 0        | Show error!   |
			| warning | 1        | Show warning! |
			| info    | 2        | Show info!    |
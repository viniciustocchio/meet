[![shield serverless](https://img.shields.io/badge/viniciustocchio-serverless%20app-yellowgreen)](https://github.com/viniciustocchio/meet)

# meet

## Description

This app provides a list of upcoming events for any given city, with data provided by Google Calendar. The app works offline using cached data from the last time it was used online. The user can search for events in a specific city or browse all events, customize how many events are shown on screen, click an event for more details, and see how many events are upcoming in certain cities.

### FEATURE 1: FILTER EVENTS BY CITY

- Scenario 1: When user hasn't searched for a city, show upcoming events from all cities.

Given user hasn’t searched for any city.

When the user opens the app.

Then the user should see a list of all upcoming events.

- Scenario 2: User should see a list of suggestions when they search for city.

Given the main page is open.

When user starts typing in the city textbox.

Then the user should see a list of cities (suggestions) that match what they’ve typed.

- Scenario 3: User can select a city from the suggested list.

Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing.

When the user selects a city (e.g., “Berlin, Germany”) from the list.

Then their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city.

### FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS

- Scenario 1: An event element is collapsed by default.

Given user is on the main page.

When nothing is selected.

Then the even details will be 'collapsed'.

- Scenario 2: User can expand an event to see its details.

Given user wants to see more about an event.

When the user clicks clicks on that event.

Then the details for that event will expand.

- Scenario 3: User can collapse an event to hide its details.

Given user has seen the details and wants to collapse.

When the user clicks on the expanded details.

Then the details will collapse again.

### FEATURE 3: SPECIFY NUMBER OF EVENTS

- Scenario 1: When user hasn’t specified a number, 32 is the default number.

Given the user searched for event results for a city.

When a user searches for events in a city.

Then the default amount of search results per city will be 32.

- Scenario 2: User can change the number of events they want to see.

Given the user opened the search results query.

When the user changes the default number.

Then the default number of results will be changed to what the users select.

### FEATURE 4: USE THE APP WHEN OFFLINE

- Scenario 1: Show cached data when there’s no internet connection.

Given the app has no internet connection.

When connection to internet is lost.

Then that data will be shown.

- Scenario 2: Show error when user changes the settings (city, time range).

Given the user opened the settings tab.

When the user changes the settings.

Then an error will show.

### FEATURE 5: DATA VISUALIZATION

- Scenario 1: Show a chart with the number of upcoming events in each city.

Given the user selected a city.

When the user clicks on the city’s upcoming events button.

Then a chart will list the upcoming events taking place in the city.

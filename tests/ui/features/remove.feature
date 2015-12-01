Feature: An user can remove a contact in the list
Scenario: This user click on the remove button of the first contact
Given The first contact is no longer part of the contacts
When This user click on the remove button of the first contact
Then This contact does not appear in the list
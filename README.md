# qb-angular

Front end client code for the quiz bowl project.
Written in typescript with the Angular framework.

## Disclaimer

My intent with this project is to learn Angular. Expect substantial changes to existing code as I learn and experiment with different design patterns. Because of this, do not expect 100% consistency throughout the code as some modules may have not been updated to reflect new design patterns.

## Requirements

* [ng-bootstrap](https://ng-bootstrap.github.io/) - Enables some bootstrap javascript features.
* [qb-django](https://github.com/sebastbk/qb-django) - A Django back end API.

## Questions

The questions module contains components and services relating to questions.

* Services to get, create, and modify questions.
* A means to list and search for questions. (limited to the angular in memory data service.)
* A multipurpose details page that services as a view/edit/create. You must be logged in as the creator of the question (or as an admin) to edit a question.

> TODO:
> * The ability for users to rate and favourite questions. (will probably wait until a back end has been implemented before attempting this.)

## Collections

The collections module contains components and services relating to collections of questions.

* Services to get, create, and modify collections.
* A means to list and search for collections.
* Details of a collection, which contains the list of questions in the collection.
* Edit currently only allows for editing of tags.

> TODO:
> * creation of collections (not sure if titles should be unique)
> * description field

## News

The news module currently displays a list of the latest posts.

## Auth

The auth module contains the authentication services, guards, and login component.

* Currently you can log in as any user with an arbitrary password.

> TODO:
> * Need to look up common authentication implementations.
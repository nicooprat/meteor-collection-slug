# Slug for collections

Add slug to collections. Slugs are url-friendly strings auto-generated from another field. Typically, you'll want to create a slug from a title, and display it in the URL.

### Install
```sh
meteor add nicooprat:collection-slug
```

### Usage

Basic usage examples.

#### Attach

```js
Posts = new Mongo.Collection('posts');

// Attach behaviour with the default options
Posts.attachBehaviour('slug');

// Attach behaviour with custom options
Posts.attachBehaviour('slug', {
  source: 'title', // Default field to get the title from
  destination: 'slug' // Default field to set the slug to
});
```

Using `CollectionBehaviours.attach` you can also attach a behaviour to multiple
collections. You can also add multiple behaviours to a collection or add
multiple behaviours to multiple collections.

Please see [`zimme:collection-behaviours`][CollectionBehaviours] for more
info on attaching behaviours to collections.

#### Insert

Examples are using default options.

```js
Posts.insert({
  title: 'Awesome post title'
});

// Inserted document
{
  "_id": "J9frYKmxaowznW3yM",
  "title": "Awesome post title",
  "slug": "awesome-post-title"
}
```

#### Update

Examples are using default options.

```js
Posts.update({_id: 'J9frYKmxaowznW3yM'}, {
  $set: {
    title: 'More awesome post title'
  }
});

// Updated document
{
  "_id": "J9frYKmxaowznW3yM",
  "title": "More awesome post title",
  "slug": "more-awesome-post-title"
}
```

### Options

The following options can be used:

* `source`: Optional. Default: `title`. Field to get the slug from.
* `destination`: Optional. Default: `slug`. Field to set the slug to.

### Global configuration

The global configuration for this package should be in shared code, preferably
in a `lib` folder.

```js
// Configure behaviour globally
// All collection using this behaviour will use these settings as defaults, eg.:
CollectionBehaviours.configure('slug', {
  source: 'name',
  destination: 'url'
});
```

### Notes

* Warning: This code doesn't check if the slug is unique in the database!
* This package attaches a schema to the collection(s) if `aldeed:collection2` is
used by the application (no need to set the slug field definition to your own schema first).
* Inspiration from https://github.com/zimme/meteor-collection-timestampable and
https://github.com/jagi/meteor-astronomy-slug-behavior/
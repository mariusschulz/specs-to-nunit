# specs-to-nunit

Converts specification texts to NUnit test method stubs.


## Example

These specs …

    When a user changes their password
    
    - the password hash is recomputed
    - the password is updated in the database
    - a notification email is sent to the user

… will be turned into the following test method stubs:

```cs
[TestFixture]
public class When_a_user_changes_their_password
{
    [Test]
    public void The_password_hash_is_recomputed()
    {
        throw new System.NotImplementedException();
    }

    [Test]
    public void The_password_is_updated_in_the_database()
    {
        throw new System.NotImplementedException();
    }

    [Test]
    public void A_notification_email_is_sent_to_the_user()
    {
        throw new System.NotImplementedException();
    }
}
```


## Live Demo

You can find a live demo at [https://blog.mariusschulz.com/toolbox](https://blog.mariusschulz.com/toolbox/).

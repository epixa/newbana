'use strict';

/*
The contract is a builder object, but you're not building on the greater system
itself. Instead, you are building a description of the changes that you want to
apply, and the greater system itself is responsible for acting on those changes.

The contract cannot be used to directly mutate the greater system, though using
the contract can have side effects.

For example, extending the config has no effect on the greater system config
without the modified contract being returned, but invoking a logging function
does immediately log the message.

Honestly, I'm not thrilled by this last bit, so I'm still considering whether
to simply treat the logger as a totally separate thing outside of the scope of
the context. In that scenario, each system would receive a logger and a
contract rather than a single contract that happens to contain the logger.

Not represented here is the concept of environment. It's readonly, so it could
be attached to the contract or passed separately. Where the logger ends up will
likely dictate where the environment ends up.
*/

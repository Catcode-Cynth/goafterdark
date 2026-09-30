<div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto space-y-8">
    <div className="space-y-2">
      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-md shadow-primary/20">
        <Ticket className="w-6 h-6 text-primary-foreground" />
      </div>
      <h1 className="font-display text-2xl font-bold text-foreground">Welcome back</h1>
      <p className="text-sm text-muted-foreground">Join GoAfterDark and start exploring events
</p>
    </div>

    <form onSubmit={handleLogin} className="space-y-4">
      <InputField
        label="Email"
        icon={Mail}
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        label="Password"
        icon={Lock}
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="flex justify-end">
        <button type="button" className="text-xs text-primary font-medium hover:underline">
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25"
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>

    <p className="text-center text-xs text-muted-foreground">
      Don't have an account?{" "}
      <button onClick={() => navigate("/register")} className="text-primary font-semibold hover:underline">
        Sign up
      </button>
    </p>
  </div>
</div>
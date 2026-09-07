    export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ");

      return res.status(400).json({
        error: message,
      });
    }

    req[source] = result.data;

    next();
  };
};
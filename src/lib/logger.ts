type LogLevel = 'info' | 'warn' | 'error';

function format(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
  return JSON.stringify(entry);
}

export const logger = {
  info(message: string, meta?: Record<string, unknown>) {
    process.stdout.write(format('info', message, meta) + '\n');
  },
  warn(message: string, meta?: Record<string, unknown>) {
    process.stdout.write(format('warn', message, meta) + '\n');
  },
  error(message: string, meta?: Record<string, unknown>) {
    process.stderr.write(format('error', message, meta) + '\n');
  },
};

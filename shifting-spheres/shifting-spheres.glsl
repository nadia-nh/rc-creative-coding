// Shadertoy Inputs
uniform vec3  iResolution; // viewport resolution (in pixels)
uniform float iTime;       // shader playback time (in seconds)

// SDF for a circle (0.0 at center, 1.0 at edge)
float circleSDF(vec2 p, float radius) {
    return length(p) * (1.0 / radius);
}

// Creates a solid color mask based on the distance
vec3 fill(float d, vec3 color) {
    return color * (1.0 - step(1.0, d));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Setup coordinates [-1, 1] with aspect correction
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    // Define motion logic
    // The main position oscillates on X and Y
    vec2 pos = uv;
    pos.x += sin(iTime) * 0.5;
    pos.y += tan(iTime) * 0.1;

    vec2 offset = vec2(0.5, 0.3);
    
    // Color cycles over time
    vec3 circleColor = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0, 2, 4));
    vec3 white = vec3(1.0);

    // Drawing
    vec3 col = vec3(0.0);

    // Circle 1 + Pupil
    col += fill(circleSDF(pos, 0.5), circleColor);
    col += fill(circleSDF(pos - offset * sin(iTime), 0.03), white);
    
    // Circle 2 + Pupil
    col += fill(circleSDF(pos - offset, 0.5), circleColor);
    col += fill(circleSDF(pos - offset + offset * sin(iTime), 0.03), white);

    fragColor = vec4(col, 1.0);
}
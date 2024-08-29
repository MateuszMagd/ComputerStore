package com.app.backend.utils;

import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Utills {
    public static byte[] loadPhoto(String fileName) throws IOException {
        ClassPathResource resource = new ClassPathResource("photo/" + fileName);
        Path path = Paths.get(resource.getURI());
        return Files.readAllBytes(path);
    }
}
